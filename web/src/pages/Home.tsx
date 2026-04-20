import { ReactNode, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, formatAmount } from "../lib/api";
import MemberCard from "../components/MemberCard";
import MemberDrawer from "../components/MemberDrawer";
import { SkeletonCard, SkeletonList, SkeletonLine } from "../components/Skeleton";
import Panel from "../components/ui/Panel";
import StatCard from "../components/ui/StatCard";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import { MoneyIcon, UsersIcon, HomeIcon, CloseIcon } from "../components/Icon";
import TotalsDrawer, { MemberSummary, TransactionSnapshot, InvestmentSummary } from "../components/TotalsDrawer";
import { motion } from "framer-motion";



type HomeResponse = {
  membersCount: number;
  groupBalance: number;
  arrearsCount: number;
  remainingBalance: number;
  totalDeposits: number;
  totalWithdraws: number;
  cards: MemberSummary[];
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
  const me = useQuery({
    queryKey: ["me"],
    queryFn: async () => (await api.get("/me")).data,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
  });
  const role = me.data?.role as undefined | "admin" | "accountant" | "user";
  const [drawerUserId, setDrawerUserId] = useState<string | null>(null);
  const [yearSummaries, setYearSummaries] = useState<Record<number, number>>({});
  const [yearSummaryLoading, setYearSummaryLoading] = useState(false);
  const [yearSummaryError, setYearSummaryError] = useState<string | null>(null);
  const [showTotalsDrawer, setShowTotalsDrawer] = useState(false);

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
    queryFn: async () => (await api.get(`/transactions`, { params: { limit: 10 } })).data?.rows ?? [],
    enabled: role === "user" && !!myId,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
  });
  const withdraws = useQuery<TransactionSnapshot[]>({
    queryKey: ["withdrawals", "totals"],
    queryFn: async () => (await api.get("/transactions", { params: { type: "withdraw", limit: 20 } })).data?.rows ?? [],
    enabled: showTotalsDrawer,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
  const investmentsQuery = useQuery<InvestmentSummary[]>({
    queryKey: ["investments", "totals-view"],
    queryFn: async () => (await api.get("/investments")).data,
    enabled: showTotalsDrawer,
    staleTime: 30_000,
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
    if (!data)
      return [] as Array<{
        label: string;
        value: ReactNode;
        icon: JSX.Element;
        variant: "default" | "success" | "danger" | "info";
        helper?: ReactNode;
        onClick?: () => void;
      }>;
    const stats: Array<{
      label: string;
      value: ReactNode;
      icon: JSX.Element;
      variant: "default" | "success" | "danger" | "info";
      helper?: ReactNode;
      onClick?: () => void;
    }> = [
      {
        label: "Total balance",
        value: formatAmount(data.groupBalance),
        icon: <MoneyIcon className="w-5 h-5" />,
        variant: "success" as const,
        helper: "Tap to see deposits vs. withdrawals",
        onClick: () => setShowTotalsDrawer(true),
      },
      {
        label: "Available cash",
        value: formatAmount(data.groupBalance),
        icon: <MoneyIcon className="w-5 h-5" />,
        variant: "default" as const,
        helper: "Tap to see per-member balances",
        onClick: () => navigate("/balances"),
      },
      { label: "Active members", value: data.membersCount, icon: <UsersIcon className="w-5 h-5" />, variant: "info" as const },
      { label: "Open dues", value: data.arrearsCount, icon: <HomeIcon className="w-5 h-5" />, variant: "danger" as const },
    ];
    if (role === "admin" || role === "accountant") {
      const info = data.investments || { principal: 0, expectedInterest: 0 };
      stats.push(
        { label: "Invested funds", value: formatAmount(info.principal), icon: <MoneyIcon className="w-5 h-5" />, variant: "info" as const },
        { label: "Expected interest", value: formatAmount(info.expectedInterest), icon: <MoneyIcon className="w-5 h-5" />, variant: "success" as const },
        { label: "Total collected", value: formatAmount(data.totalDeposits), icon: <MoneyIcon className="w-5 h-5" />, variant: "info" as const }
      );
    }
    return stats;
  }, [data, role, navigate]);

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

  if (home.isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 dark:text-red-400 mb-4">Failed to load dashboard data.</p>
        <button
          onClick={() => home.refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const memberCards = Array.isArray(data.cards) ? data.cards : [];

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
          <StatCard label="Savings balance" value={formatAmount(currentBalance)} icon={<MoneyIcon className="w-5 h-5" />} variant="success" />
          <StatCard label="Total contributed" value={formatAmount(totalDeposits)} icon={<HomeIcon className="w-5 h-5" />} variant="info" />
          {nextEmi > 0 && (
            <StatCard label="Next payment due" value={formatAmount(nextEmi)} icon={<MoneyIcon className="w-5 h-5" />} variant="danger" />
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
                <span className="col-span-4 text-right">{formatAmount(t.amount)}</span>
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
          <StatCard
            key={String(stat.label)}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            variant={stat.variant}
            helper={stat.helper}
            onClick={stat.onClick}
          />
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
              const maxVal = Math.max(yearSummaries[currentYear] || 1, yearSummaries[lastYear] || 1);
              const pct = typeof total === "number" ? Math.min(100, Math.max(5, (total / maxVal) * 100)) : 0;
              
              const display =
                typeof total === "number" ? (
                  formatAmount(total)
                ) : yearSummaryLoading ? (
                  <SkeletonLine className="h-5 w-24" />
                ) : (
                  "Tap to view"
                );
              return (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => navigate(`/yearly?year=${item.year}`)}
                  className="text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-4 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400/40 relative overflow-hidden group"
                >
                  <div className="relative z-10">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-500 transition-colors">{item.label}</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">{display}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.year}</p>
                  </div>
                  {typeof total === "number" && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 h-1 bg-blue-500/20 dark:bg-blue-400/20"
                    />
                  )}
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
          {memberCards.map((card) => (
            <MemberCard key={card.userId} card={card} onClick={() => setDrawerUserId(card.userId)} />
          ))}
        </div>
      </Panel>

      {drawerUserId && <MemberDrawer userId={drawerUserId} onClose={() => setDrawerUserId(null)} />}
      <TotalsDrawer
        isOpen={showTotalsDrawer && !!data}
        totalDeposits={data?.totalDeposits || 0}
        totalWithdraws={data?.totalWithdraws || 0}
        available={data?.groupBalance || 0}
        rows={memberCards}
        withdraws={withdraws.data}
        investments={investmentsQuery.data}
        loadingWithdraws={withdraws.isLoading}
        loadingInvestments={investmentsQuery.isLoading}
        onClose={() => setShowTotalsDrawer(false)}
      />
    </div>
  );
}
