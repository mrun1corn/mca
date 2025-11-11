import { ReactNode, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import MemberCard from "../components/MemberCard";
import MemberDrawer from "../components/MemberDrawer";
import { SkeletonCard } from "../components/Skeleton";
import Panel from "../components/ui/Panel";
import StatCard from "../components/ui/StatCard";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import { MoneyIcon, UsersIcon, HomeIcon } from "../components/Icon";

type HomeResponse = {
  membersCount: number;
  groupBalance: number;
  arrearsCount: number;
  remainingBalance: number;
  totalDeposits: number;
  cards: any[];
  investments?: {
    activeCount: number;
    principal: number;
    expectedInterest: number;
  };
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
  const [yearSummaries, setYearSummaries] = useState<Record<number, number>>({});
  const [yearSummaryLoading, setYearSummaryLoading] = useState(false);
  const [yearSummaryError, setYearSummaryError] = useState<string | null>(null);

  const myId = me.data?.id as string | undefined;
  const dues = useQuery<any[]>({
    queryKey: ["dues", myId],
    queryFn: async () => (await api.get(`/users/${myId}/dues`)).data,
    enabled: role === "user" && !!myId,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
  });
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
        break;
      }
    }
    return best?.due || 0;
  }, [role, dues.data]);

  const data = home.data;
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  useEffect(() => {
    if (role !== "admin" && role !== "accountant") return;
    let cancelled = false;
    async function loadYearlyTotals() {
      setYearSummaryLoading(true);
      setYearSummaryError(null);
      try {
        const years = [currentYear, lastYear];
        const responses = await Promise.all(
          years.map(async (year) => {
            const res = await api.get("/reports/yearly-collection", { params: { year } });
            return { year, total: res.data?.total ?? 0 };
          })
        );
        if (!cancelled) {
          setYearSummaries(
            responses.reduce((acc, item) => {
              acc[item.year] = item.total;
              return acc;
            }, {} as Record<number, number>)
          );
        }
      } catch (err: any) {
        if (!cancelled) setYearSummaryError(err?.response?.data?.error || "Failed to load yearly totals");
      } finally {
        if (!cancelled) setYearSummaryLoading(false);
      }
    }
    loadYearlyTotals();
    return () => {
      cancelled = true;
    };
  }, [role, currentYear, lastYear]);

  const summaryStats = useMemo(() => {
    if (!data) return [] as Array<{ label: string; value: ReactNode; icon: JSX.Element; variant: "default" | "success" | "danger" | "info" }>;
    const stats: Array<{ label: string; value: ReactNode; icon: JSX.Element; variant: "default" | "success" | "danger" | "info" }> = [
      { label: "People in the circle", value: data.membersCount, icon: <UsersIcon className="w-5 h-5" />, variant: "info" as const },
      { label: "Money on hand", value: formatBDT(data.groupBalance), icon: <MoneyIcon className="w-5 h-5" />, variant: "success" as const },
      { label: "Promises still open", value: data.arrearsCount, icon: <HomeIcon className="w-5 h-5" />, variant: "danger" as const },
      { label: "Ready-to-use cash", value: formatBDT(data.remainingBalance), icon: <MoneyIcon className="w-5 h-5" />, variant: "default" as const },
    ];
    if (role !== "user") {
      const info = data.investments || { principal: 0, expectedInterest: 0 };
      stats.push(
        { label: "Money out earning returns", value: formatBDT(info.principal), icon: <MoneyIcon className="w-5 h-5" />, variant: "info" as const },
        { label: "Projected interest", value: formatBDT(info.expectedInterest), icon: <MoneyIcon className="w-5 h-5" />, variant: "success" as const }
      );
    }
    return stats;
  }, [data, role]);

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

  if (role === "user") {
    const currentBalance = home.data?.remainingBalance || 0;
    const totalDeposits = home.data?.totalDeposits || 0;
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="My savings"
          title={`Hi ${me.data?.name || "there"}, here’s the current picture`}
          description="Just the basics you need: balance, what you’ve put in, and the next payment if one exists."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Savings balance" value={formatBDT(currentBalance)} icon={<MoneyIcon className="w-5 h-5" />} variant="success" />
          <StatCard label="Total contributed" value={formatBDT(totalDeposits)} icon={<HomeIcon className="w-5 h-5" />} variant="info" />
          {nextEmi > 0 && (
            <StatCard label="Next payment due" value={formatBDT(nextEmi)} icon={<MoneyIcon className="w-5 h-5" />} variant="danger" />
          )}
        </div>

        {isRefreshing ? <div className="text-xs text-slate-500">Refreshing your dashboard…</div> : null}

        <Panel
          title="Recent activity"
          description="This log only shows the movements tied to your name."
        >
          <div className="grid grid-cols-12 text-xs text-slate-500 px-2">
            <div className="col-span-3">Date</div>
            <div className="col-span-5">Details</div>
            <div className="col-span-4 text-right">Amount</div>
          </div>
          <div className="max-h-64 overflow-auto divide-y">
            {txs.data?.map((t: any) => (
              <div key={t._id} className="grid grid-cols-12 items-center text-sm py-2 px-2">
                <span className="col-span-3">{new Date(t.occurredAt).toLocaleDateString("en-BD")}</span>
                <span className={`col-span-5 ${t.type === "deposit" ? "text-emerald-600" : "text-rose-600"}`}>{t.note || t.type}</span>
                <span className="col-span-4 text-right">{formatBDT(t.amount)}</span>
              </div>
            ))}
            {!txs.data?.length && <div className="text-sm text-slate-500 px-2 py-3">No recent transactions.</div>}
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryStats.map((stat) => (
          <StatCard key={String(stat.label)} label={stat.label} value={stat.value} icon={stat.icon} variant={stat.variant} />
        ))}
      </div>

      {role === "admin" || role === "accountant" ? (
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { label: "Running year collection", year: currentYear },
              { label: "Last year collection", year: lastYear },
            ].map((item) => {
              const total = yearSummaries[item.year];
              const display = typeof total === "number" ? formatBDT(total) : yearSummaryLoading ? "Loading…" : "Tap to view";
              return (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => navigate(`/yearly?year=${item.year}`)}
                  className="text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-4 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                  <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">{display}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.year}</p>
                </button>
              );
            })}
          </div>
          {yearSummaryError ? <div className="text-sm text-rose-500">{yearSummaryError}</div> : null}
        </div>
      ) : null}

      {isRefreshing ? <div className="text-xs text-slate-500">Refreshing data…</div> : null}

      <Panel
        title="Members at a glance"
        description="Click a card to see their balance, recent activity, and dues timeline."
      >
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
