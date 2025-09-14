import { useQuery } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import MemberCard from "../components/MemberCard";
import MemberDrawer from "../components/MemberDrawer";
import { useMemo, useState } from "react";
import { SkeletonCard } from "../components/Skeleton";
import { HomeIcon, MoneyIcon, UsersIcon } from "../components/Icon";

export default function Home() {
  const home = useQuery({ queryKey: ["home"], queryFn: async () => (await api.get("/home")).data });
  const me = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get("/me")).data });
  const role = me.data?.role as undefined | "admin" | "accountant" | "user";
  const [drawerUserId, setDrawerUserId] = useState<string | null>(null);

  // For user role, fetch dues and compute next EMI (next pending/partial schedule item, earliest by date)
  const myId = me.data?.id as string | undefined;
  const dues = useQuery({
    queryKey: ["dues", myId],
    queryFn: async () => (await api.get(`/users/${myId}/dues`)).data,
    enabled: role === "user" && !!myId,
  });
  // User's recent transactions (self-scoped by API)
  const txs = useQuery({
    queryKey: ["txs", myId, 10],
    queryFn: async () => (await api.get(`/transactions`, { params: { limit: 10 } })).data,
    enabled: role === "user" && !!myId,
  });
  const nextEmi = useMemo(() => {
    if (role !== "user" || !dues.data) return 0;
    let best: { date: number; due: number } | null = null;
    for (const d of dues.data as any[]) {
      for (const it of d.schedule as any[]) {
        if (it.status === "paid") continue;
        const date = new Date(it.dueDate).getTime();
        const remaining = (it.totalDue as number) - (it.paid || 0);
        const due = Math.max(0, remaining);
        if (!best || date < best.date) best = { date, due };
        break; // only next item per schedule
      }
    }
    return best?.due || 0;
  }, [role, dues.data]);

  const loading = !home.data && home.isLoading;
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  const data = home.data;

  // Simplified Home for regular users
  if (role === "user") {
    const currentBalance = home.data?.remainingBalance || 0;
    const totalDeposits = home.data?.totalDeposits || 0;
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="card bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-gray-800">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><MoneyIcon/> Current Balance</div>
            <div className="text-2xl font-medium">{formatBDT(currentBalance)}</div>
          </div>
          <div className="card">
            <div className="text-gray-600 dark:text-gray-300">Total Deposits</div>
            <div className="text-2xl font-medium">{formatBDT(totalDeposits)}</div>
          </div>
          {nextEmi > 0 && (
            <div className="card bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><HomeIcon/> Next Due / EMI</div>
              <div className="text-2xl font-medium">{formatBDT(nextEmi)}</div>
            </div>
          )}
        </div>

        <div className="glass p-3 rounded">
          <div className="font-medium mb-2">Recent Activity</div>
          <div className="grid grid-cols-12 text-xs text-gray-500 px-2">
            <div className="col-span-3">Date</div>
            <div className="col-span-5">Details</div>
            <div className="col-span-4 text-right">Amount</div>
          </div>
          <div className="max-h-64 overflow-auto divide-y">
            {txs.data?.map((t: any) => (
              <div key={t._id} className="grid grid-cols-12 items-center text-sm py-1 px-2">
                <span className="col-span-3">{new Date(t.occurredAt).toLocaleDateString("en-BD")}</span>
                <span className={`col-span-5 ${t.type==='deposit' ? 'text-green-700' : 'text-red-700'}`}>{t.note || t.type}</span>
                <span className="col-span-4 text-right">{formatBDT(t.amount)}</span>
              </div>
            ))}
            {!txs.data?.length && <div className="text-sm text-gray-500 px-2 py-3">No recent transactions</div>}
          </div>
        </div>
      </div>
    );
  }

  // Admin/Accountant overview unchanged
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="card bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><UsersIcon/> Members</div>
          <div className="text-2xl font-medium">{data.membersCount}</div>
        </div>
        <div className="card bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-gray-800">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><MoneyIcon/> Total Balance</div>
          <div className="text-2xl font-medium">{formatBDT(data.groupBalance)}</div>
        </div>
        <div className="card bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><HomeIcon/> Unpaid Dues</div>
          <div className="text-2xl font-medium">{data.arrearsCount}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="card">
          <div className="text-gray-600 dark:text-gray-300">Available Balance</div>
          <div className="text-2xl font-medium">{formatBDT(data.remainingBalance)}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.cards.map((c: any) => (
          <MemberCard key={c.userId} card={c} onClick={() => setDrawerUserId(c.userId)} />
        ))}
      </div>
      {drawerUserId && <MemberDrawer userId={drawerUserId} onClose={() => setDrawerUserId(null)} />}
    </div>
  );
}
