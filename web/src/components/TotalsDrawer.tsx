import { useEffect } from "react";
import { createPortal } from "react-dom";
import { formatAmount } from "../lib/api";
import { MoneyIcon, HomeIcon, CloseIcon } from "./Icon";
import Panel from "./ui/Panel";
import StatCard from "./ui/StatCard";
import { SkeletonList, SkeletonCard } from "./Skeleton";
import { AnimatePresence, motion } from "framer-motion";

export type MemberSummary = {
  userId: string;
  name: string;
  balance: number;
  lastMonth: number;
  totalDeposits: number;
  totalWithdraws: number;
  recent: Array<{ date: string; type: string; amount: number; note?: string }>;
};

export type TransactionSnapshot = {
  _id: string;
  userId: string;
  type: string;
  amount: number;
  occurredAt: string;
  note?: string;
};

export type InvestmentSummary = {
  id: string;
  name: string;
  amount: number;
  expectedInterest: number;
  returnedAmount?: number;
  status: "active" | "completed";
  startDate: string;
};

export default function TotalsDrawer({
  isOpen,
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
  isOpen: boolean;
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

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-40 bg-white dark:bg-slate-950 overflow-y-auto"
        >
          <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total balance</p>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Collections vs. deductions</h2>
              </div>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                onClick={onClose}
              >
                <CloseIcon className="w-4 h-4" /> Close
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 mb-4">
              <StatCard label="Collected overall" value={formatAmount(totalDeposits)} icon={<MoneyIcon className="w-5 h-5" />} variant="success" />
              <StatCard label="Deducted / invested" value={formatAmount(totalWithdraws)} icon={<HomeIcon className="w-5 h-5" />} variant="danger" />
              <StatCard label="Net balance" value={formatAmount(net)} icon={<MoneyIcon className="w-5 h-5" />} variant="info" />
              <StatCard label="Available cash" value={formatAmount(available)} icon={<MoneyIcon className="w-5 h-5" />} variant="default" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Panel title="Per-member totals" description="All-time deposits and deductions">
                <div className="max-h-72 overflow-auto pr-1">
                  {/* Mobile View */}
                  <div className="sm:hidden space-y-2.5">
                    {rows.map((row) => (
                      <div key={row.userId} className="rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-white dark:bg-slate-900 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">{row.name}</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-300 text-sm">{formatAmount(row.balance || 0)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>Deposited: {formatAmount(row.totalDeposits || 0)}</span>
                          <span className="text-rose-500">Deducted: {formatAmount(row.totalWithdraws || 0)}</span>
                        </div>
                      </div>
                    ))}
                    {!rows.length && <div className="text-center text-slate-500 text-sm py-2">No members yet.</div>}
                  </div>

                  {/* Desktop View */}
                  <div className="hidden sm:block">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
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
                            <td className="py-2 px-3 text-right">{formatAmount(row.totalDeposits || 0)}</td>
                            <td className="py-2 px-3 text-right text-rose-500">{formatAmount(row.totalWithdraws || 0)}</td>
                            <td className="py-2 pl-3 text-right font-semibold text-emerald-600 dark:text-emerald-300">{formatAmount(row.balance || 0)}</td>
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
                </div>
              </Panel>

              <Panel title="Recent withdrawals / investments" description="Latest 20 records">
                {loadingWithdraws ? (
                  <div className="space-y-3">
                    <SkeletonList rows={4} columns={2} />
                  </div>
                ) : withdraws && withdraws.length ? (
                  <div className="space-y-2 max-h-72 overflow-auto pr-1">
                    {withdraws.map((tx) => (
                      <div key={tx._id} className="border border-slate-100 dark:border-slate-800 rounded-xl p-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{tx.note || "Withdrawal"}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(tx.occurredAt).toLocaleDateString("en-BD")}</p>
                        </div>
                        <p className="text-sm font-semibold text-rose-600 dark:text-rose-300">{formatAmount(Math.abs(tx.amount || 0))}</p>
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
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <SkeletonCard lines={2} />
                  <SkeletonCard lines={2} />
                </div>
              ) : investments && investments.length ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {investments.map((inv) => {
                    const returned = inv.returnedAmount || 0;
                    const total = inv.amount + (inv.expectedInterest || 0);
                    const pct = total ? Math.min(100, Math.round((returned / total) * 100)) : 0;
                    return (
                      <div key={inv.id} className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-900 dark:text-white">{inv.name}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300">
                            {inv.status === "completed" ? "Completed" : "Active"}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Principal: {formatAmount(inv.amount)}</p>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Returned {formatAmount(returned)} of {formatAmount(total)} ({pct}%)
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full bg-emerald-500" transition={{ duration: 1, ease: "easeOut" }} />
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
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
