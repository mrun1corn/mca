import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useEffect, useMemo, useState } from "react";

export default function WithdrawForm({ userId }: { userId: string }) {
  const qc = useQueryClient();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [months, setMonths] = useState(3);
  const [rate, setRate] = useState(2.0);
  const [penaltyEnabled, setPenaltyEnabled] = useState(true);
  const [penaltyPct, setPenaltyPct] = useState(1.0);
  const [graceDays, setGraceDays] = useState(3);

  const users = useQuery({ queryKey: ["users"], queryFn: async () => (await api.get(`/users`)).data });
  const eligibleMembers = useMemo(() => (users.data || []).filter((u: any) => u.id !== userId), [users.data, userId]);
  const [excluded, setExcluded] = useState<string[]>([]);
  const toggleExcluded = (id: string) => setExcluded((arr) => arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  const [preview, setPreview] = useState<{ eligibleCount: number; rows: { userId: string; name: string; sharePoisha: number }[] } | null>(null);
  useEffect(() => {
    const amt = Number(amount);
    if (!amt || amt <= 0) { setPreview(null); return; }
    const excludeIds = excluded.join(",");
    api.get(`/preview/withdraw-split`, { params: { amountPoisha: amt, excludeIds } })
      .then((r) => setPreview(r.data)).catch(() => setPreview(null));
  }, [amount, excluded]);

  const mutation = useMutation({ mutationFn: (body: any) => api.post("/withdraw", body), onSuccess: () => { qc.invalidateQueries({ queryKey: ["txs", userId] }); qc.invalidateQueries({ queryKey: ["home"] }); } });
  const onSubmit = () => {
    mutation.mutate({
      takerId: userId,
      amountPoisha: Number(amount),
      date,
      reason: "Withdraw",
      excludeMemberIds: excluded,
      due: { useDefaultDate: true, defaultDate: date, startDate: null, endDate: null, months, monthlyRatePct: rate },
      penalty: { enabled: penaltyEnabled, monthlyPenaltyPct: penaltyPct, graceDays },
    });
  };
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <input className="border p-2 w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Amount (poisha)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input className="border p-2 w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className="border p-2 w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" type="number" min={1} placeholder="Months" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
        <input className="border p-2 w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" type="number" step="0.1" placeholder="Monthly Rate %" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
      </div>
      <div className="grid grid-cols-3 gap-2 items-center text-sm">
        <label className="col-span-3 inline-flex items-center gap-2"><input type="checkbox" checked={penaltyEnabled} onChange={(e) => setPenaltyEnabled(e.target.checked)} /> Apply penalty when overdue</label>
        <input className="border p-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" type="number" step="0.1" placeholder="Penalty %/mo" value={penaltyPct} onChange={(e) => setPenaltyPct(Number(e.target.value))} />
        <input className="border p-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" type="number" placeholder="Grace days" value={graceDays} onChange={(e) => setGraceDays(Number(e.target.value))} />
      </div>
      <div>
        <div className="text-sm font-medium mb-1">Exclude members from split</div>
        <div className="max-h-28 overflow-auto border border-gray-200 dark:border-gray-700 rounded p-2 text-sm">
          {eligibleMembers.map((m: any) => (
            <label key={m.id} className="flex items-center gap-2 py-0.5">
              <input type="checkbox" checked={excluded.includes(m.id)} onChange={() => toggleExcluded(m.id)} />
              <span>{m.name}</span>
            </label>
          ))}
          {eligibleMembers.length === 0 && <div className="text-gray-500">No other members</div>}
        </div>
      </div>
      {preview && (
        <div className="text-xs">
          <div className="font-medium mb-1">Split preview ({preview.eligibleCount} members)</div>
          <div className="max-h-28 overflow-auto border border-gray-200 dark:border-gray-700 rounded">
            {preview.rows.map((r) => (
              <div key={r.userId} className="flex justify-between px-2 py-1 border-b last:border-b-0 border-gray-100 dark:border-gray-700">
                <span className="truncate pr-2">{r.name}</span>
                <span>{r.sharePoisha}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="text-right">
        <button className="bg-red-600 text-white px-3 py-1 rounded transition-transform active:scale-[0.98]" onClick={onSubmit}>Withdraw</button>
      </div>
    </div>
  );
}
