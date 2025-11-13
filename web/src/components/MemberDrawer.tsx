import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import { CloseIcon, PencilIcon, TrashIcon } from "./Icon";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";
import { useToast } from "./Toast";
import Button from "./Button";
import { SkeletonList, SkeletonTable } from "./Skeleton";

export default function MemberDrawer({ userId, onClose }: { userId: string; onClose: () => void }) {
  const qc = useQueryClient();
  const { notify } = useToast();
  const { data: txsData = [], isLoading: txsLoading } = useQuery<any[]>({ queryKey: ["txs", userId], queryFn: async () => (await api.get(`/transactions?userId=${userId}`)).data, enabled: !!userId });
  const me = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get(`/me`)).data });
  const { data: duesData = [], isLoading: duesLoading } = useQuery<any[]>({ queryKey: ["dues", userId], queryFn: async () => (await api.get(`/users/${userId}/dues`)).data, enabled: !!userId });
  const { data: member } = useQuery({ queryKey: ["member", userId], queryFn: async () => (await api.get(`/users/${userId}`)).data, enabled: !!userId });
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(true); }, []);
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);
  const [editing, setEditing] = useState<null | { _id: string; type: string; amount: number; occurredAt: string; note?: string }>(null);
  const patchTx = useMutation({
    mutationFn: (body: any) => api.patch(`/transactions/${editing?._id}`, body),
    onMutate: async (body: any) => {
      await qc.cancelQueries({ queryKey: ["txs", userId] });
      const previous = qc.getQueryData<any[]>(["txs", userId]);
      if (previous && editing) {
        const next = previous.map((tx) => (tx._id === editing._id ? { ...tx, note: body.note, occurredAt: body.date, amount: body.amount ? Math.round(body.amount * 100) : tx.amount } : tx));
        qc.setQueryData(["txs", userId], next);
      }
      return { previous };
    },
    onError: (_err, _vars, context) => { if (context?.previous) qc.setQueryData(["txs", userId], context.previous); notify("Update failed", "error"); },
    onSuccess: () => { notify("Transaction updated", "success"); },
    onSettled: () => { qc.invalidateQueries({ queryKey: ["txs", userId] }); setEditing(null); },
  });
  const deleteTx = useMutation({
    mutationFn: (id: string) => api.delete(`/transactions/${id}`),
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: ["txs", userId] });
      const previous = qc.getQueryData<any[]>(["txs", userId]);
      if (previous) qc.setQueryData(["txs", userId], previous.filter((tx) => tx._id !== id));
      return { previous };
    },
    onError: (e: any, _vars, context) => { if (context?.previous) qc.setQueryData(["txs", userId], context.previous); notify(e?.response?.data?.error || "Delete failed", "error"); },
    onSuccess: () => notify("Transaction deleted", "success"),
    onSettled: () => qc.invalidateQueries({ queryKey: ["txs", userId] }),
  });
  const closeWithAnim = () => {
    setShow(false);
    setTimeout(() => onClose(), 220);
  };
  const [tab, setTab] = useState<"ledger" | "deposit" | "withdraw" | "dues">("ledger");
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-white dark:bg-slate-950 overflow-y-auto transition-transform duration-200 ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Member overview</p>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Details & activity</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 break-all">
                {member?.name ? `User: ${member.name}` : `User ID: ${userId}`}
              </p>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={closeWithAnim}
            >
              <CloseIcon className="w-4 h-4" /> Close
            </button>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-sm">
            {(["ledger", "deposit", "withdraw", "dues"] as const).map((t) => (
              <button
                key={t}
                className={`rounded-full px-4 py-1.5 capitalize transition ${
                  tab === t ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div key={tab} className="animate-page-fade space-y-4">
            {tab === "deposit" && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                <DepositForm userId={userId} />
              </div>
            )}

            {tab === "withdraw" && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                <WithdrawForm userId={userId} />
              </div>
            )}

            {tab === "ledger" && (
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Recent transactions</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Sorted newest first</p>
                </div>
              </div>
              <div className="grid grid-cols-12 text-xs uppercase tracking-wide text-slate-400 px-2">
                <div className="col-span-3">Date</div>
                <div className="col-span-4">Details</div>
                <div className="col-span-3 text-right">Amount</div>
                <div className="col-span-2 text-right">{me.data?.role !== "user" ? "Actions" : ""}</div>
              </div>
              {txsLoading ? (
                <div className="mt-4">
                  <SkeletonTable rows={4} columns={4} />
                </div>
              ) : (
                <div className="mt-2 space-y-2 max-h-[420px] overflow-auto pr-1">
                  {txsData.map((t: any) => (
                    <div
                      key={t._id}
                      className="rounded-xl border border-slate-100 dark:border-slate-800 px-3 py-2 text-sm flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:items-center"
                    >
                      <span className="text-slate-600 dark:text-slate-300 sm:col-span-3">{new Date(t.occurredAt).toLocaleDateString("en-BD")}</span>
                      <span
                        className={`font-medium sm:col-span-4 ${t.type === "deposit" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                      >
                        {t.note || t.type}
                      </span>
                      <span className="font-semibold sm:text-right sm:col-span-3">{formatBDT(t.amount)}</span>
                      {me.data?.role !== "user" ? (
                        <span className="flex gap-2 sm:justify-end sm:col-span-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 sm:flex-none bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-slate-800 dark:text-blue-200 dark:hover:bg-slate-700"
                            onClick={() => setEditing({ ...t, occurredAt: String(t.occurredAt).slice(0, 10) })}
                          >
                            <PencilIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="flex-1 sm:flex-none"
                            onClick={() => {
                              if (confirm("Delete this transaction?")) deleteTx.mutate(t._id);
                            }}
                          >
                            <TrashIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Delete</span>
                          </Button>
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
              {txsData.length === 0 && !txsLoading && <div className="text-sm text-slate-500 dark:text-slate-400 px-2 py-3">No transactions yet.</div>}
            </section>
            )}

            {tab === "dues" && (
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Upcoming dues</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Next three installments per plan</p>
                </div>
              </div>
              <div className="grid grid-cols-3 text-xs uppercase tracking-wide text-slate-400 px-2">
                <span>Due date</span>
                <span>Amount</span>
                <span className="text-right">Status</span>
              </div>
              {duesLoading ? (
                <div className="mt-4">
                  <SkeletonList rows={4} columns={3} />
                </div>
              ) : (
                <div className="mt-2 space-y-3 max-h-[420px] overflow-auto pr-1 text-sm">
                  {duesData.map((d: any) => (
                    <div key={d._id} className="rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400">Principal: {formatBDT(d.principal)}</div>
                      {d.schedule.slice(0, 3).map((it: any, i: number) => (
                        <div key={i} className="grid grid-cols-3 items-center px-3 py-2 border-t border-slate-50 dark:border-slate-800">
                          <span>{new Date(it.dueDate).toLocaleDateString("en-BD")}</span>
                          <span>{formatBDT(it.totalDue)}</span>
                          <span className="text-right text-xs uppercase tracking-wide">{it.status}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {duesData.length === 0 && !duesLoading && <div className="text-sm text-slate-500 dark:text-slate-400 px-2 py-3">No dues scheduled.</div>}
            </section>
            )}
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 overflow-y-auto">
          <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Edit transaction</p>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{editing.note || editing.type}</h2>
              </div>
              <button className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-rose-500" onClick={() => setEditing(null)}>
                <CloseIcon className="w-4 h-4" /> Close
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <label className="space-y-1 block">
                <span className="text-xs uppercase tracking-wide text-slate-500">Date</span>
                <input className="input w-full" type="date" value={editing.occurredAt} onChange={(e) => setEditing({ ...(editing as any), occurredAt: e.target.value })} />
              </label>
              <label className="space-y-1 block">
                <span className="text-xs uppercase tracking-wide text-slate-500">Note</span>
                <input className="input w-full" placeholder="Note" value={editing.note || ""} onChange={(e) => setEditing({ ...(editing as any), note: e.target.value })} />
              </label>
              <label className="space-y-1 block">
                <span className="text-xs uppercase tracking-wide text-slate-500">Amount (BDT)</span>
                <input
                  className="input w-full"
                  type="number"
                  step="0.01"
                  placeholder="Amount (BDT)"
                  value={(editing.amount / 100).toFixed(2)}
                  disabled={editing.type !== "deposit"}
                  onChange={(e) => setEditing({ ...(editing as any), amount: Math.round(Number(e.target.value) * 100) })}
                />
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button
                disabled={patchTx.isPending}
                onClick={() => {
                  const body: any = { note: editing?.note, date: editing?.occurredAt };
                  if (editing?.type === "deposit" && typeof editing.amount === "number") body.amount = editing.amount / 100;
                  patchTx.mutate(body);
                }}
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
