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

type MemberSummary = {
  userId: string;
  name: string;
  balance: number;
  lastMonth: number;
  totalDeposits: number;
  totalWithdraws: number;
  recent: Array<{ date: string; type: string; amount: number; note?: string }>;
};

type TransactionSnapshot = {
  _id: string;
  userId: string;
  type: string;
  amount: number;
  occurredAt: string;
  note?: string;
};

type InvestmentSummary = {
  id: string;
  name: string;
  amountPoisha: number;
  expectedInterestPoisha: number;
  returnedPoisha?: number;
  status: "active" | "completed";
  startDate: string;
};

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
  const me = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get("/me")).data });
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
    queryFn: async () => (await api.get(`/transactions`, { params: { limit: 10 } })).data,
    enabled: role === "user" && !!myId,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
  });
  const withdraws = useQuery<TransactionSnapshot[]>({
    queryKey: ["withdrawals", "totals"],
    queryFn: async () => (await api.get("/transactions", { params: { type: "withdraw", limit: 20 } })).data,
    enabled: showTotalsDrawer,
  });
  const investmentsQuery = useQuery<InvestmentSummary[]>({
    queryKey: ["investments", "totals-view"],
    queryFn: async () => (await api.get("/investments")).data,
    enabled: showTotalsDrawer,
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
        value: formatBDT(data.groupBalance),
        icon: <MoneyIcon className="w-5 h-5" />,
        variant: "success" as const,
        helper: "Tap to see deposits vs. withdrawals",
        onClick: () => setShowTotalsDrawer(true),
      },
      {
        label: "Available cash",
        value: formatBDT(data.groupBalance),
        icon: <MoneyIcon className="w-5 h-5" />,
        variant: "default" as const,
        helper: "Tap to see per-member balances",
        onClick: () => navigate("/balances"),
      },
      { label: "Active members", value: data.membersCount, icon: <UsersIcon className="w-5 h-5" />, variant: "info" as const },
      { label: "Open dues", value: data.arrearsCount, icon: <HomeIcon className="w-5 h-5" />, variant: "danger" as const },
    ];
    if (role !== "user") {
      const info = data.investments || { principal: 0, expectedInterest: 0 };
      stats.push(
        { label: "Invested funds", value: formatBDT(info.principal), icon: <MoneyIcon className="w-5 h-5" />, variant: "info" as const },
        { label: "Expected interest", value: formatBDT(info.expectedInterest), icon: <MoneyIcon className="w-5 h-5" />, variant: "success" as const },
        { label: "Total collected", value: formatBDT(data.totalDeposits), icon: <MoneyIcon className="w-5 h-5" />, variant: "info" as const }
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
          {data.cards.map((card) => (
            <MemberCard key={card.userId} card={card} onClick={() => setDrawerUserId(card.userId)} />
          ))}
        </div>
      </Panel>

      {drawerUserId && <MemberDrawer userId={drawerUserId} onClose={() => setDrawerUserId(null)} />}
      {showTotalsDrawer && data ? (
        <TotalBalanceDrawer
          totalDeposits={data.totalDeposits}
          totalWithdraws={data.totalWithdraws}
          available={data.groupBalance}
          rows={data.cards}
          withdraws={withdraws.data}
          investments={investmentsQuery.data}
          loadingWithdraws={withdraws.isLoading}
          loadingInvestments={investmentsQuery.isLoading}
          onClose={() => setShowTotalsDrawer(false)}
        />
      ) : null}
    </div>
  );
}

function TotalBalanceDrawer({
  totalDeposits,
  totalWithdraws,
  available,
  rows,
  withdraws,
  investments,
  loadingWithdraws,
  loadingInvestments,
  onClose,
}: {
  totalDeposits: number;
  totalWithdraws: number;
  available: number;
  rows: MemberSummary[];
  withdraws?: TransactionSnapshot[];
  investments?: InvestmentSummary[];
  loadingWithdraws: boolean;
  loadingInvestments: boolean;
  onClose: () => void;
}) {
  const net = totalDeposits - totalWithdraws;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const close = () => {
    setShow(false);
    setTimeout(onClose, 180);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center" onClick={close}>
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${show ? "opacity-100" : "opacity-0"}`} />
      <div
        className={`w-[calc(100%-1rem)] sm:max-w-5xl max-h-[90vh] glass rounded-3xl p-6 overflow-y-auto shadow-2xl transition-all duration-200 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total balance</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Collections vs. deductions</h2>
          </div>
          <button className="text-sm text-slate-500 hover:text-rose-500" onClick={close}>
            Close
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 mb-4">
          <StatCard label="Collected overall" value={formatBDT(totalDeposits)} icon={<MoneyIcon className="w-5 h-5" />} variant="success" />
          <StatCard label="Deducted / invested" value={formatBDT(totalWithdraws)} icon={<HomeIcon className="w-5 h-5" />} variant="danger" />
          <StatCard label="Net balance" value={formatBDT(net)} icon={<MoneyIcon className="w-5 h-5" />} variant="info" />
          <StatCard label="Available cash" value={formatBDT(available)} icon={<MoneyIcon className="w-5 h-5" />} variant="default" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Panel title="Per-member totals" description="All-time deposits and deductions">
            <div className="overflow-auto max-h-72 pr-1">
              <table className="min-w-[480px] text-sm">
                <thead>
                  <tr className="text-left text-slate-500 dark:text-slate-400">
                    <th className="py-2 pr-3 font-medium">Member</th>
                    <th className="py-2 px-3 font-medium text-right">Deposited</th>
                    <th className="py-2 px-3 font-medium text-right">Deducted</th>
                    <th className="py-2 pl-3 font-medium text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.userId} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="py-2 pr-3 font-medium text-slate-900 dark:text-white">{row.name}</td>
                      <td className="py-2 px-3 text-right">{formatBDT(row.totalDeposits || 0)}</td>
                      <td className="py-2 px-3 text-right">{formatBDT(row.totalWithdraws || 0)}</td>
                      <td className="py-2 pl-3 text-right font-semibold text-emerald-600 dark:text-emerald-300">{formatBDT(row.balance || 0)}</td>
                    </tr>
                  ))}
                  {!rows.length && (
                    <tr>
                      <td colSpan={4} className="py-3 text-center text-slate-500">
                        No members yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Recent withdrawals / investments" description="Latest 20 records">
            {loadingWithdraws ? (
              <div className="text-sm text-slate-500">Loading…</div>
            ) : withdraws && withdraws.length ? (
              <div className="space-y-2 max-h-72 overflow-auto pr-1">
                {withdraws.map((tx) => (
                  <div key={tx._id} className="border border-slate-100 dark:border-slate-800 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{tx.note || "Withdrawal"}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(tx.occurredAt).toLocaleDateString("en-BD")}</p>
                    </div>
                    <p className="text-sm font-semibold text-rose-600 dark:text-rose-300">{formatBDT(Math.abs(tx.amount || 0))}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-500">No withdrawals recorded yet.</div>
            )}
          </Panel>
        </div>

        <Panel title="Investments overview" description="Track funds currently out of circulation">
          {loadingInvestments ? (
            <div className="text-sm text-slate-500">Loading…</div>
          ) : investments && investments.length ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {investments.map((inv) => {
                const returned = inv.returnedPoisha || 0;
                const total = inv.amountPoisha + (inv.expectedInterestPoisha || 0);
                const pct = total ? Math.min(100, Math.round((returned / total) * 100)) : 0;
                return (
                  <div key={inv.id} className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900 dark:text-white">{inv.name}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300">
                        {inv.status === "completed" ? "Completed" : "Active"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Principal: {formatBDT(inv.amountPoisha)}</p>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Returned {formatBDT(returned)} of {formatBDT(total)} ({pct}%)
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-slate-500">No investments recorded yet.</div>
          )}
        </Panel>
      </div>
    </div>
  );
}
