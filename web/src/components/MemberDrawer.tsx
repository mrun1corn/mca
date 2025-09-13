import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import { CloseIcon } from "./Icon";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";

export default function MemberDrawer({ userId, onClose }: { userId: string; onClose: () => void }) {
  const txs = useQuery({ queryKey: ["txs", userId], queryFn: async () => (await api.get(`/transactions?userId=${userId}`)).data, enabled: !!userId });
  const dues = useQuery({ queryKey: ["dues", userId], queryFn: async () => (await api.get(`/users/${userId}/dues`)).data, enabled: !!userId });
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(true); }, []);
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
                <div key={t._id} className="flex justify-between text-sm border-b py-1">
                  <span>{new Date(t.occurredAt).toLocaleDateString("en-BD")}</span>
                  <span className={t.type === 'deposit' ? 'text-green-700' : 'text-red-700'}>{t.type}</span>
                  <span>{formatBDT(t.amountPoisha)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'dues' && (
          <div>
            <div className="font-medium">Dues</div>
            <div className="space-y-1 max-h-64 overflow-auto text-sm">
              {dues.data?.map((d: any) => (
                <div key={d._id} className="border p-2 rounded">
                  <div>Principal: {formatBDT(d.principalPoisha)}</div>
                  {d.schedule.slice(0, 3).map((it: any, i: number) => (
                    <div key={i} className="flex justify-between">
                      <span>{new Date(it.dueDate).toLocaleDateString("en-BD")}</span>
                      <span>{formatBDT(it.totalDuePoisha)}</span>
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
