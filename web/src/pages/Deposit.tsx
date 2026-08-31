import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useEffect, useState } from "react";
import DepositForm from "../components/DepositForm";
import PageHeader from "../components/layout/PageHeader";
import InvestmentReturnForm from "../components/InvestmentReturnForm";
import { motion, AnimatePresence } from "framer-motion";
import { SkeletonCard, SkeletonLine } from "../components/Skeleton";

const helperNotes = [
  "“Simple deposit” keeps the money free for future withdrawals.",
  "“Pay a due” hunts for the next unpaid instalment and fills it automatically.",
  "Penalty only applies when the due date plus grace period has passed.",
];

export default function DepositPage() {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await api.get(`/users`)).data,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

  const [userId, setUserId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"member" | "investment">("member");

  useEffect(() => {
    if (!userId && users.data?.[0]) setUserId(users.data[0].id);
  }, [users.data, userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-6"
    >
      <PageHeader
        eyebrow="Deposit & Collections"
        title="Capture contributions and online payments"
        description="Record cash deposits, settle active due installments, or accept instant online payments via bKash & Nagad."
      />

      <div className="flex gap-2 p-1.5 bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("member")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "member"
              ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Member Contribution
        </button>
        <button
          onClick={() => setActiveTab("investment")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "investment"
              ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Investment Return
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_1fr]">
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === "member" ? (
              <motion.section
                key="member-form"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.2 }}
                className="glass rounded-3xl p-6 shadow-lg space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Who is contributing today?
                  </label>

                  {users.isLoading ? (
                    <div className="space-y-2">
                      <SkeletonLine className="h-12 rounded-xl" />
                    </div>
                  ) : (
                    <select
                      className="input w-full h-12 text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    >
                      <option value="">Select member…</option>
                      {users.data?.map((u: any) => (
                        <option key={u.id} value={u.id}>
                          {u.name} {u.phone ? `(${u.phone})` : ""}
                        </option>
                      ))}
                    </select>
                  )}

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Select the member to view active dues and choose manual or instant online bKash/Nagad checkout.
                  </p>
                </div>

                {userId ? (
                  <motion.div
                    key={userId}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-slate-100 dark:border-slate-800 pt-6"
                  >
                    <DepositForm userId={userId} />
                  </motion.div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 text-center text-sm text-slate-500">
                    Select a member above to unlock the deposit form.
                  </div>
                )}
              </motion.section>
            ) : (
              <motion.section
                key="investment-form"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.2 }}
                className="glass rounded-3xl p-6 shadow-lg space-y-4"
              >
                <header className="mb-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Investment return</p>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Put matured funds back into the circle
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Split the principal + interest back across the original contributors in one click.
                  </p>
                </header>
                <InvestmentReturnForm />
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        <aside className="space-y-4">
          <div className="glass rounded-3xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Quick reminders</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {helperNotes.map((note) => (
                <li key={note} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-100 dark:border-slate-800 p-5 bg-white/80 dark:bg-slate-900/70 text-sm text-slate-600 dark:text-slate-300">
            <p className="font-medium text-slate-900 dark:text-white">💡 Payment Tip</p>
            <p className="mt-2 text-xs leading-relaxed">
              When members pay online via <strong>bKash</strong> or <strong>Nagad</strong>, the payment gateway auto-matches their Transaction ID and updates the dues schedule immediately without manual bookkeeping.
            </p>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
