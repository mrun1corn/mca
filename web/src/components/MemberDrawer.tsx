import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import { CloseIcon } from "./Icon";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";
import { useToast } from "./Toast";

export default function MemberDrawer({ userId, onClose }: { userId: string; onClose: () => void }) {
  const qc = useQueryClient();
  const { notify } = useToast();
  const txs = useQuery({ queryKey: ["txs", userId], queryFn: async () => (await api.get(`/transactions?userId=${userId}`)).data, enabled: !!userId });
  const me = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get(`/me`)).data });
  const dues = useQuery({ queryKey: ["dues", userId], queryFn: async () => (await api.get(`/users/${userId}/dues`)).data, enabled: !!userId });
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(true); }, []);
  // Prevent background scroll while drawer is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);
  const [editing, setEditing] = useState<null | { _id: string; type: string; amount: number; occurredAt: string; note?: string }>(null);
  const patchTx = useMutation({
    mutationFn: (body: any) => api.patch(`/transactions/${editing?._id}`, body),
    onSuccess: () => { notify("Transaction updated", "success"); qc.invalidateQueries({ queryKey: ["txs", userId] }); setEditing(null); },
    onError: () => notify("Update failed", "error"),
  });
  const deleteTx = useMutation({
    mutationFn: (id: string) => api.delete(`/transactions/${id}`),
    onSuccess: () => { notify("Transaction deleted", "success"); qc.invalidateQueries({ queryKey: ["txs", userId] }); },
    onError: (e: any) => notify(e?.response?.data?.error || "Delete failed", "error"),
  });
  const closeWithAnim = () => {
    setShow(false);
    setTimeout(() => onClose(), 180);
  };
  const [tab, setTab] = useState<'ledger'|'deposit'|'withdraw'|'dues'>('ledger');
  return (
    <div className="fixed inset-0 flex justify-end" onClick={closeWithAnim}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${show ? 'opacity-100' : 'opacity-0'}`} />
      <div
        className={`w-full sm:w-[420px] bg-white dark:bg-gray-800 h-full p-4 shadow-xl transform transition-transform ${show ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="font-semibold text-lg">Member</div>
          <button className="p-2 rounded hover:bg-gray-100" aria-label="Close" onClick={closeWithAnim}><CloseIcon/></button>
        </div>
        <div className="flex border-b mb-3 text-sm">
          {(['ledger','deposit','withdraw','dues'] as const).map((t) => (
            <button key={t} className={`px-3 py-2 mr-2 ${tab===t ? 'border-b-2 border-blue-600 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'deposit' && (
          <div className="mt-1"><DepositForm userId={userId} /></div>
        )}

        {tab === 'withdraw' && (
          <div className="mt-1"><WithdrawForm userId={userId} /></div>
        )}

        {tab === 'ledger' && (
          <div>
            <div className="font-medium mb-1">Ledger</div>
            <div className="space-y-1 max-h-64 overflow-auto">
              {txs.data?.map((t: any) => (
                <div key={t._id} className="grid grid-cols-12 items-center text-sm border-b py-1 gap-2">
                  <span className="col-span-3">{new Date(t.occurredAt).toLocaleDateString("en-BD")}</span>
                  <span className={`col-span-3 ${t.type === 'deposit' ? 'text-green-700' : 'text-red-700'}`}>{t.type}</span>
                  <span className="col-span-3">{formatBDT(t.amount)}</span>
                  {me.data?.role !== 'user' ? (
                    <span className="col-span-3 text-right space-x-2">
                      <button className="text-blue-600 hover:opacity-80" onClick={() => setEditing({ ...t, occurredAt: String(t.occurredAt).slice(0,10) })}>Edit</button>
                      <button className="text-red-600 hover:opacity-80" onClick={() => { if (confirm('Delete this transaction?')) deleteTx.mutate(t._id); }}>Delete</button>
                    </span>
                  ) : (
                    <span className="col-span-3" />
                  )}
                </div>
              ))}
            </div>
            {editing && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setEditing(null)}>
                <div className="w-full max-w-md bg-white dark:bg-gray-800 p-4 rounded shadow" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-semibold">Edit Transaction</div>
                    <button className="text-sm text-gray-600 hover:opacity-80" onClick={() => setEditing(null)}>Close</button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <input className="border p-2 w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" type="date" value={editing.occurredAt} onChange={(e) => setEditing({ ...(editing as any), occurredAt: e.target.value })} />
                    <input className="border p-2 w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" placeholder="Note" value={editing.note || ''} onChange={(e) => setEditing({ ...(editing as any), note: e.target.value })} />
                    <input className="border p-2 w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" type="number" step="0.01" placeholder="Amount (BDT)" value={(editing.type==='deposit' ? (editing.amount/100).toFixed(2) : (editing.amount/100).toFixed(2))} disabled={editing.type !== 'deposit'} onChange={(e) => setEditing({ ...(editing as any), amount: Math.round(Number(e.target.value) * 100) })} />
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700" onClick={() => setEditing(null)}>Cancel</button>
                    <button className="px-3 py-1 rounded bg-blue-600 text-white disabled:opacity-60" disabled={patchTx.isPending} onClick={() => {
                      const body: any = { note: editing?.note, date: editing?.occurredAt };
                      if (editing?.type === 'deposit' && typeof editing.amount === 'number') body.amount = editing.amount / 100;
                      patchTx.mutate(body);
                    }}>Save</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'dues' && (
          <div>
            <div className="font-medium">Dues</div>
            <div className="space-y-1 max-h-64 overflow-auto text-sm">
              {dues.data?.map((d: any) => (
                <div key={d._id} className="border p-2 rounded">
                  <div>Principal: {formatBDT(d.principal)}</div>
                  {d.schedule.slice(0, 3).map((it: any, i: number) => (
                    <div key={i} className="flex justify-between">
                      <span>{new Date(it.dueDate).toLocaleDateString("en-BD")}</span>
                      <span>{formatBDT(it.totalDue)}</span>
                      <span className="text-xs">{it.status}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
