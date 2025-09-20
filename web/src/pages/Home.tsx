import { useQuery } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import MemberCard from "../components/MemberCard";
import MemberDrawer from "../components/MemberDrawer";
import { ReactNode, useMemo, useState } from "react";
import { SkeletonCard } from "../components/Skeleton";
import { HomeIcon, MoneyIcon, UsersIcon } from "../components/Icon";
import Panel from "../components/ui/Panel";
import StatCard from "../components/ui/StatCard";
import Button from "../components/Button";
import Spinner from "../components/ui/Spinner";
import { useNavigate } from "react-router-dom";

type HomeResponse = {
  membersCount: number;
  groupBalance: number;
  arrearsCount: number;
  remainingBalance: number;
  totalDeposits: number;
  cards: any[];
};


export default function Home() {
  const STALE_TIME = 30_000;
  const navigate = useNavigate();
  const home = useQuery<HomeResponse>({
    queryKey: ["home"],
    queryFn: async () => (await api.get("/home")).data,
    staleTime: STALE_TIME,
    gcTime: STALE_TIME * 4,
    refetchOnWindowFocus: false,
  });
  const me = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get("/me")).data });
  const role = me.data?.role as undefined | "admin" | "accountant" | "user";
  const [drawerUserId, setDrawerUserId] = useState<string | null>(null);

  // For user role, fetch dues and compute next EMI (next pending/partial schedule item, earliest by date)
  const myId = me.data?.id as string | undefined;
  const dues = useQuery<any[]>({
    queryKey: ["dues", myId],
    queryFn: async () => (await api.get(`/users/${myId}/dues`)).data,
    enabled: role === "user" && !!myId,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
  });
  // User's recent transactions (self-scoped by API)
  const txs = useQuery<any[]>({
    queryKey: ["txs", myId, 10],
    queryFn: async () => (await api.get(`/transactions`, { params: { limit: 10 } })).data,
    enabled: role === "user" && !!myId,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
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

  const data = home.data;

  const summaryStats = useMemo(() => {
    if (!data)
      return [] as Array<{
        label: string;
        value: number | string;
        icon: ReactNode;
        variant: "default" | "success" | "danger" | "info";
      }>;
    return [
      { label: "Members", value: data.membersCount, icon: <UsersIcon className="w-5 h-5" />, variant: "info" as const },
      { label: "Total balance", value: formatBDT(data.groupBalance), icon: <MoneyIcon className="w-5 h-5" />, variant: "success" as const },
      { label: "Open dues", value: data.arrearsCount, icon: <HomeIcon className="w-5 h-5" />, variant: "danger" as const },
      { label: "Available balance", value: formatBDT(data.remainingBalance), icon: <MoneyIcon className="w-5 h-5" />, variant: "default" as const },
    ];
  }, [data]);

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

  if (!data) return null;

  const isRefreshing = home.isFetching && !loading;

  // Simplified Home for regular users
  if (role === "user") {
    const currentBalance = home.data?.remainingBalance || 0;
    const totalDeposits = home.data?.totalDeposits || 0;
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Savings balance" value={formatBDT(currentBalance)} icon={<MoneyIcon className="w-5 h-5" />} variant="success" />
          <StatCard label="Total deposited" value={formatBDT(totalDeposits)} icon={<HomeIcon className="w-5 h-5" />} variant="info" />
          {nextEmi > 0 && (
            <StatCard label="Next payment" value={formatBDT(nextEmi)} icon={<MoneyIcon className="w-5 h-5" />} variant="danger" />
          )}
        </div>

        {isRefreshing ? <div className="animate-fade-in"><Spinner label="Refreshing your dashboard…" /></div> : null}

        <Panel title="Recent activity" description="Most recent transactions on your account.">
          <div className="grid grid-cols-12 text-xs text-gray-500 px-2">
            <div className="col-span-3">Date</div>
            <div className="col-span-5">Details</div>
            <div className="col-span-4 text-right">Amount</div>
          </div>
          <div className="max-h-64 overflow-auto divide-y">
            {txs.data?.map((t: any) => (
              <div key={t._id} className="grid grid-cols-12 items-center text-sm py-1 px-2">
                <span className="col-span-3">{new Date(t.occurredAt).toLocaleDateString("en-BD")}</span>
                <span className={`col-span-5 ${t.type === 'deposit' ? 'text-emerald-600' : 'text-rose-600'}`}>{t.note || t.type}</span>
                <span className="col-span-4 text-right">{formatBDT(t.amount)}</span>
              </div>
            ))}
            {!txs.data?.length && <div className="text-sm text-gray-500 px-2 py-3">No recent transactions</div>}
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryStats.map((stat) => (
          <StatCard key={stat.label as string} label={stat.label} value={stat.value} icon={stat.icon} variant={stat.variant} />
        ))}
      </div>

      {isRefreshing ? <div className="animate-fade-in"><Spinner label="Refreshing group totals…" /></div> : null}

      <Panel title="Quick actions" description="Shortcuts for frequent tasks.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button className="w-full" onClick={() => navigate("/deposit")}>Record a deposit</Button>
          <Button className="w-full" variant="secondary" onClick={() => navigate("/withdraw")}>Start withdrawal</Button>
          <Button className="w-full" variant="secondary" onClick={() => navigate("/export")}>Download CSVs</Button>
          {role === "admin" ? (
            <Button className="w-full" variant="secondary" onClick={() => navigate("/people")}>Manage members</Button>
          ) : null}
        </div>
      </Panel>

      <Panel title="Members" description="Select a member to open their details.">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {(data.cards as any[]).map((card: any) => (
            <MemberCard key={card.userId} card={card} onClick={() => setDrawerUserId(card.userId)} />
          ))}
        </div>
      </Panel>

      {drawerUserId && <MemberDrawer userId={drawerUserId} onClose={() => setDrawerUserId(null)} />}
    </div>
  );
}
