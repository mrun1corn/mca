import { useQuery } from "@tanstack/react-query";
import { api, formatAmount } from "../lib/api";
import PageHeader from "../components/layout/PageHeader";
import Panel from "../components/ui/Panel";
import { HomeIcon, MoneyIcon } from "../components/Icon";
import { ReactNode } from "react";
import { SkeletonCard, SkeletonTable } from "../components/Skeleton";

type MemberSummary = {
  userId: string;
  name: string;
  balance: number;
  totalDeposits: number;
  totalWithdraws: number;
};

type HomeResponse = {
  cards: MemberSummary[];
};

export default function BalancesPage() {
  const { data, isLoading, isError, error, refetch } = useQuery<HomeResponse>({
    queryKey: ["home"],
    queryFn: async () => (await api.get("/home")).data,
    staleTime: 30_000,
    gcTime: 120_000,
    refetchOnWindowFocus: false,
  });

  const rows = data?.cards ?? [];
  const totalDeposits = rows.reduce((sum, row) => sum + (row.totalDeposits || 0), 0);
  const totalWithdraws = rows.reduce((sum, row) => sum + (row.totalWithdraws || 0), 0);
  const totalBalance = rows.reduce((sum, row) => sum + (row.balance || 0), 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Available balances"
        title="See what each member has contributed and withdrawn"
        description="Totals include every transaction on record. Balances update automatically when you record deposits, dues payments, withdrawals, or investment returns."
      />

      {isError ? (
        <div className="p-6 text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Failed to load balances data.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {isLoading ? (
            <>
              <Summary tile="Total collected" value="—" icon={<MoneyIcon className="w-5 h-5" />} />
              <Summary tile="Total deducted" value="—" icon={<HomeIcon className="w-5 h-5" />} />
              <Summary tile="Available cash" value="—" icon={<MoneyIcon className="w-5 h-5" />} />
            </>
          ) : (
            <>
              <Summary tile="Total collected" value={formatAmount(totalDeposits)} icon={<MoneyIcon className="w-5 h-5" />} />
              <Summary tile="Total deducted" value={formatAmount(totalWithdraws)} icon={<HomeIcon className="w-5 h-5" />} />
              <Summary tile="Available cash" value={formatAmount(totalBalance)} icon={<MoneyIcon className="w-5 h-5" />} />
            </>
          )}
        </div>

        <Panel title="Per-member breakdown" description="Detailed list of all member balances.">
          {isLoading ? (
            <div className="py-6">
              <SkeletonTable rows={6} columns={4} />
            </div>
          ) : rows.length === 0 ? (
            <div className="text-sm text-slate-500">No members found.</div>
          ) : (
            <div>
              {/* Responsive Cards for Mobile */}
              <div className="sm:hidden space-y-3">
                {rows.map((row) => (
                  <div key={row.userId} className="rounded-2xl border border-slate-250 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-4 space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-900 dark:text-white">{row.name}</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-300">{formatAmount(row.balance || 0)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <div>
                        <span>Deposited:</span>
                        <p className="font-medium text-slate-700 dark:text-slate-300">{formatAmount(row.totalDeposits || 0)}</p>
                      </div>
                      <div>
                        <span>Deducted:</span>
                        <p className="font-medium text-slate-700 dark:text-slate-300">{formatAmount(row.totalWithdraws || 0)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Mobile Total Card */}
                <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-750 bg-slate-50/60 dark:bg-slate-900/40 p-4 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 dark:text-white">Total</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-300">{formatAmount(totalBalance)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <div>
                      <span>Deposited:</span>
                      <p className="font-medium text-slate-700 dark:text-slate-300">{formatAmount(totalDeposits)}</p>
                    </div>
                    <div>
                      <span>Deducted:</span>
                      <p className="font-medium text-slate-700 dark:text-slate-300">{formatAmount(totalWithdraws)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Standard Table for Desktop */}
              <div className="hidden sm:block overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 dark:text-slate-400">
                      <th className="py-2 pr-3 font-medium">Member</th>
                      <th className="py-2 px-3 font-medium text-right">Deposited</th>
                      <th className="py-2 px-3 font-medium text-right">Deducted</th>
                      <th className="py-2 pl-3 font-medium text-right">Current balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.userId} className="border-t border-slate-100 dark:border-slate-800">
                        <td className="py-2 pr-3 text-slate-900 dark:text-white font-medium">{row.name}</td>
                        <td className="py-2 px-3 text-right">{formatAmount(row.totalDeposits || 0)}</td>
                        <td className="py-2 px-3 text-right">{formatAmount(row.totalWithdraws || 0)}</td>
                        <td className="py-2 pl-3 text-right font-semibold text-emerald-600 dark:text-emerald-300">{formatAmount(row.balance || 0)}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40">
                      <td className="py-2 pr-3 font-semibold text-slate-900 dark:text-white">Total</td>
                      <td className="py-2 px-3 text-right font-semibold">{formatAmount(totalDeposits)}</td>
                      <td className="py-2 px-3 text-right font-semibold">{formatAmount(totalWithdraws)}</td>
                      <td className="py-2 pl-3 text-right font-semibold">{formatAmount(totalBalance)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Panel>
        </>
      )}
    </div>
  );
}

function Summary({ tile, value, icon }: { tile: ReactNode; value: ReactNode; icon: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{tile}</p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-blue-100/70 dark:bg-blue-500/20 text-blue-600 dark:text-blue-200">{icon}</div>
      </div>
    </div>
  );
}
