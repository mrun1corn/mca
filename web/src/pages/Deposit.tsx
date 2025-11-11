import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useEffect, useState } from "react";
import DepositForm from "../components/DepositForm";
import PageHeader from "../components/layout/PageHeader";
import InvestmentReturnForm from "../components/InvestmentReturnForm";

const helperNotes = [
  "“Simple deposit” keeps the money free for future withdrawals.",
  "“Pay a due” hunts for the next unpaid instalment and fills it automatically.",
  "Penalty only applies when the due date plus grace period has passed.",
];

export default function DepositPage() {
  const users = useQuery({ queryKey: ["users"], queryFn: async () => (await api.get(`/users`)).data });
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (!userId && users.data?.[0]) setUserId(users.data[0].id);
  }, [users.data]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Deposit"
        title="Capture contributions while the context is still fresh"
        description="Pick the member, type in the amount, and let the system suggest instalments when dues exist."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_1fr]">
        <div className="space-y-6">
          <section className="glass rounded-3xl p-6 shadow-lg">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Who is saving today?</label>
                <select className="input w-full h-12" value={userId} onChange={(e) => setUserId(e.target.value)}>
                  <option value="">Select member…</option>
                  {users.data?.map((u: any) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Need to add someone first? Head to the People page, then swing back here.
                </p>
              </div>
              {userId ? (
                <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                  <DepositForm userId={userId} />
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-6 text-sm text-slate-500">
                  Select a member to unlock the form.
                </div>
              )}
            </div>
          </section>

          <section className="glass rounded-3xl p-6 shadow-lg">
            <header className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Investment return</p>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Put matured funds back into the circle</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Split the principal + interest back across the original contributors in one click.
              </p>
            </header>
            <InvestmentReturnForm />
          </section>
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
            <p className="font-medium text-slate-900 dark:text-white">Tip</p>
            <p className="mt-2">
              Write notes the way your members speak. Example: “Weekly market sales” or “June 1 mobile transfer”.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
