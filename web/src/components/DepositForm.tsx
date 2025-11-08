import { memo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import Button from "./Button";
import { useToast } from "./Toast";
import { useEffect, useMemo, useState } from "react";

function DepositForm({ userId }: { userId: string }) {
  const qc = useQueryClient();
  const { notify } = useToast();
  const [mode, setMode] = useState<"simple" | "pay_due">("simple");
  const [amount, setAmount] = useState(""); // BDT (taka)
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
      const base = it.totalDue - (it.paid || 0);
      if (base <= 0) continue;
      let total = base;
      const dueDate = new Date(it.dueDate);
      const duePlusGrace = new Date(dueDate);
      duePlusGrace.setDate(duePlusGrace.getDate() + grace);
      if (includePenalty && today > duePlusGrace && selected.penaltyRule?.enabled) {
        total += Math.floor((it.totalDue * pct) / 100);
      }
      sum += total;
      // stop at first pending installment for a single-installment pay suggestion
      break;
    }
    return sum; // minor units (100 = 1 BDT)
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
      const taka = (suggested || 0) / 100;
      setAmount(taka ? taka.toFixed(2) : "");
    }
  }, [mode, selected, suggested]);

  // If no open dues, ensure we're in simple deposit mode
  useEffect(() => {
    if (!hasOpenDues && mode === "pay_due") setMode("simple");
  }, [hasOpenDues, mode]);

  const mutation = useMutation({
    mutationFn: (body: any) => api.post("/deposit", body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["txs", userId] });
      qc.invalidateQueries({ queryKey: ["home"] });
      notify("Deposit recorded", "success");
      setAmount("");
    },
    onError: () => {
      notify("Deposit failed", "error");
    },
  });
  const onSubmit = () => {
    const amtTaka = Number(amount);
    const payload: any = { userId, mode, date, note, includePenalty };
    if (amount) payload.amount = isFinite(amtTaka) ? amtTaka : 0;
    else payload.amountPoisha = suggested || 0; // fallback using minor units from suggestion
    if (mode === "pay_due") payload.dueId = dueId;
    mutation.mutate(payload);
  };
  return (
    <div className="space-y-6">
      {hasOpenDues ? (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">How should we treat this money?</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="deposit-mode" checked={mode === "simple"} onChange={() => setMode("simple")} />
              Keep it free (simple deposit)
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="deposit-mode" checked={mode === "pay_due"} onChange={() => setMode("pay_due")} />
              Pay down an open due
            </label>
          </div>
        </div>
      ) : (
        <div className="text-sm text-slate-500 dark:text-slate-400">
          This member has no open dues right now, so we’ll treat it as a regular deposit.
        </div>
      )}

      {mode === "pay_due" && hasOpenDues && (
        <div className="space-y-3 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 bg-white/70 dark:bg-slate-900/60">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Which due are we clearing?</p>
          <select className="input w-full h-12" value={dueId || (dues.data?.[0]?._id ?? "")} onChange={(e) => setDueId(e.target.value)}>
            <option value="">Select due…</option>
            {dues.data?.map((d: any) => (
              <option key={d._id} value={d._id}>
                Principal {formatBDT(d.principal)} — {d.months} months @ {d.monthlyRatePct}%
              </option>
            ))}
          </select>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={includePenalty} onChange={(e) => setIncludePenalty(e.target.checked)} />
            Add penalty when the grace period is over
          </label>
          <div className="text-xs text-slate-500">
            Suggested amount for this instalment: <span className="font-semibold">{formatBDT(suggested)}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Amount (BDT)</label>
          <input
            className="input w-full h-12"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Date</label>
          <input className="input w-full h-12" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Note for future you</label>
        <input
          className="input w-full"
          placeholder="e.g. Weekly market sales"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <p className="text-xs text-slate-500">These notes show up everywhere we display the transaction.</p>
      </div>

      <Button onClick={onSubmit} className="w-full md:w-auto">
        Save deposit
      </Button>
    </div>
  );
}


export default memo(DepositForm);
