import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useEffect, useMemo, useState } from "react";

export default function DepositForm({ userId }: { userId: string }) {
  const qc = useQueryClient();
  const [mode, setMode] = useState<"simple" | "pay_due">("simple");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("Deposit");
  const [includePenalty, setIncludePenalty] = useState(true);
  const dues = useQuery({ queryKey: ["dues", userId], queryFn: async () => (await api.get(`/users/${userId}/dues`)).data, enabled: !!userId });
  const [dueId, setDueId] = useState<string | null>(null);
  const hasOpenDues = !!(dues.data && dues.data.length > 0);
  const selected = useMemo(() => dues.data?.find((d: any) => d._id === dueId), [dues.data, dueId]);
  const suggested = useMemo(() => {
    if (!selected) return 0;
    const today = new Date(date);
    const grace = selected.penaltyRule?.graceDays ?? 3;
    const pct = selected.penaltyRule?.monthlyPenaltyPct ?? 1.0;
    let sum = 0;
    for (const it of selected.schedule) {
      if (it.status === "paid") continue;
      const base = it.totalDuePoisha - (it.paidPoisha || 0);
      if (base <= 0) continue;
      let total = base;
      const dueDate = new Date(it.dueDate);
      const duePlusGrace = new Date(dueDate);
      duePlusGrace.setDate(duePlusGrace.getDate() + grace);
      if (includePenalty && today > duePlusGrace && selected.penaltyRule?.enabled) {
        total += Math.floor((it.totalDuePoisha * pct) / 100);
      }
      sum += total;
      // stop at first pending installment for a single-installment pay suggestion
      break;
    }
    return sum;
  }, [selected, includePenalty, date]);

  // Default select first due when switching to Due Payment
  useEffect(() => {
    if (mode === "pay_due" && hasOpenDues && dues.data && !dueId) {
      setDueId(dues.data[0]._id);
    }
  }, [mode, hasOpenDues, dues.data, dueId]);

  // Auto-fill amount when in Due Payment and amount is empty; still editable
  useEffect(() => {
    if (mode === "pay_due" && selected && amount === "") {
      setAmount(String(suggested || 0));
    }
  }, [mode, selected, suggested]);

  // If no open dues, ensure we're in simple deposit mode
  useEffect(() => {
    if (!hasOpenDues && mode === "pay_due") setMode("simple");
  }, [hasOpenDues, mode]);

  const mutation = useMutation({ mutationFn: (body: any) => api.post("/deposit", body), onSuccess: () => { qc.invalidateQueries({ queryKey: ["txs", userId] }); qc.invalidateQueries({ queryKey: ["home"] }); } });
  const onSubmit = () => {
    const payload: any = { userId, mode, amountPoisha: Number(amount || suggested || 0), date, note, includePenalty };
    if (mode === "pay_due") payload.dueId = dueId;
    mutation.mutate(payload);
  };
  return (
    <div className="space-y-3">
      {hasOpenDues && (
        <div className="flex gap-4 text-sm">
          <label className="inline-flex items-center gap-1"><input type="radio" name="mode" checked={mode==='simple'} onChange={() => setMode('simple')} /> Deposit</label>
          <label className="inline-flex items-center gap-1"><input type="radio" name="mode" checked={mode==='pay_due'} onChange={() => setMode('pay_due')} /> Due Payment</label>
        </div>
      )}
      {mode === 'pay_due' && hasOpenDues && (
        <div className="space-y-2">
          <select className="border p-2 w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" value={dueId || (dues.data?.[0]?._id ?? '')} onChange={(e) => setDueId(e.target.value)}>
            <option value="">Select due…</option>
            {dues.data?.map((d: any) => (
              <option key={d._id} value={d._id}>Principal {d.principalPoisha} | {d.months} mo @ {d.monthlyRatePct}%</option>
            ))}
          </select>
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={includePenalty} onChange={(e) => setIncludePenalty(e.target.checked)} /> Include penalty if overdue</label>
          <div className="text-xs text-gray-600">Auto-filled: {suggested} poisha (editable)</div>
        </div>
      )}
      <input className="border p-2 w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Amount (poisha)" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input className="border p-2 w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input className="border p-2 w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
      <button className="bg-green-600 text-white px-3 py-1 rounded transition-transform active:scale-[0.98]" onClick={onSubmit}>Deposit</button>
    </div>
  );
}
