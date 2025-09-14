import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import { CloseIcon } from "./Icon";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";
import { useToast } from "./Toast";
import Button from "./Button";
import { PencilIcon, TrashIcon } from "./Icon";

export default function MemberDrawer({ userId, onClose }: { userId: string; onClose: () => void }) {
  const qc = useQueryClient();
  const { notify } = useToast();
  const txs = useQuery({ queryKey: ["txs", userId], queryFn: async () => (await api.get(`/transactions?userId=${userId}`)).data, enabled: !!userId });
  const me = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get(`/me`)).data });
  const dues = useQuery({ queryKey: ["dues", userId], queryFn: async () => (await api.get(`/users/${userId}/dues`)).data, enabled: !!userId });
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(true); }, []);
  // Prevent background scroll and avoid layout shift by compensating scrollbar width
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
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
    <div className="fixed inset-0 flex items-center justify-center" onClick={closeWithAnim}>
      <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`} />
      <div
        className={`w-[calc(100%-1rem)] sm:w-auto max-w-full sm:max-w-3xl max-h-[90vh] sm:max-h-[85vh] glass p-3 sm:p-4 shadow-xl rounded overflow-y-auto transform transition-all duration-200 ease-out ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="font-semibold text-lg">Member Details</div>
          <button className="p-2 rounded hover:bg-gray-100" aria-label="Close" onClick={closeWithAnim}><CloseIcon/></button>
        </div>
        <div className="flex border-b mb-3 text-sm">
          {(['ledger','deposit','withdraw','dues'] as const).map((t) => (
            <button key={t} className={`px-3 py-2 mr-2 transition-colors ${tab===t ? 'border-b-2 border-blue-600 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`} onClick={() => setTab(t)}>
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
            <div className="grid grid-cols-12 text-xs text-gray-500 px-2">
              <div className="col-span-3">Date</div>
              <div className="col-span-3">Details</div>
              <div className="col-span-3">Amount</div>
              <div className="col-span-3 text-right">{me.data?.role !== 'user' ? 'Actions' : ''}</div>
            </div>
            <div className="space-y-1 max-h-64 overflow-auto">
              {txs.data?.map((t: any) => (
                <div key={t._id} className="grid grid-cols-12 items-center text-sm border-b py-1 gap-2 px-2">
                  <span className="col-span-3">{new Date(t.occurredAt).toLocaleDateString("en-BD")}</span>
                  <span className={`col-span-3 ${t.type === 'deposit' ? 'text-green-700' : 'text-red-700'}`}>{t.note || t.type}</span>
                  <span className="col-span-3">{formatBDT(t.amount)}</span>
                  {me.data?.role !== 'user' ? (
                    <span className="col-span-3 text-right">
                      <div className="inline-flex gap-2">
                        <Button variant="ghost" size="xs" onClick={() => setEditing({ ...t, occurredAt: String(t.occurredAt).slice(0,10) })}>
                          <PencilIcon className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button variant="danger" size="xs" onClick={() => { if (confirm('Delete this transaction?')) deleteTx.mutate(t._id); }}>
                          <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </span>
                  ) : (
                    <span className="col-span-3" />
                  )}
                </div>
              ))}
            </div>
            {editing && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setEditing(null)}>
                <div className="w-full max-w-md glass p-4 rounded" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-semibold">Edit Transaction</div>
                    <button className="text-sm text-gray-600 hover:opacity-80" onClick={() => setEditing(null)}>Close</button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <input className="input w-full" type="date" value={editing.occurredAt} onChange={(e) => setEditing({ ...(editing as any), occurredAt: e.target.value })} />
                    <input className="input w-full" placeholder="Note" value={editing.note || ''} onChange={(e) => setEditing({ ...(editing as any), note: e.target.value })} />
                    <input className="input w-full" type="number" step="0.01" placeholder="Amount (BDT)" value={(editing.type==='deposit' ? (editing.amount/100).toFixed(2) : (editing.amount/100).toFixed(2))} disabled={editing.type !== 'deposit'} onChange={(e) => setEditing({ ...(editing as any), amount: Math.round(Number(e.target.value) * 100) })} />
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
                    <Button disabled={patchTx.isPending} onClick={() => {
                      const body: any = { note: editing?.note, date: editing?.occurredAt };
                      if (editing?.type === 'deposit' && typeof editing.amount === 'number') body.amount = editing.amount / 100;
                      patchTx.mutate(body);
                    }}>Save</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'dues' && (
          <div>
            <div className="font-medium">Dues</div>
            <div className="grid grid-cols-3 text-xs text-gray-500 px-2 mt-1">
              <div>Due Date</div>
              <div>Amount</div>
              <div className="text-right">Status</div>
            </div>
            <div className="space-y-1 max-h-64 overflow-auto text-sm">
              {dues.data?.map((d: any) => (
                <div key={d._id} className="border rounded">
                  <div className="px-2 py-1 text-xs text-gray-600">Principal: {formatBDT(d.principal)}</div>
                  {d.schedule.slice(0, 3).map((it: any, i: number) => (
                    <div key={i} className="grid grid-cols-3 items-center px-2 py-1 border-t">
                      <span>{new Date(it.dueDate).toLocaleDateString("en-BD")}</span>
                      <span>{formatBDT(it.totalDue)}</span>
                      <span className="text-xs text-right">{it.status}</span>
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
