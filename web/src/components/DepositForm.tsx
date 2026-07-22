import { memo, ReactNode, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, formatAmount } from "../lib/api";
import { queryKeys } from "../lib/queryKeys";
import Button from "./Button";
import { useToast } from "./Toast";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import ModeCard from "./ui/ModeCard";

function DepositForm({ userId }: { userId: string }) {
  const qc = useQueryClient();
  const { notify } = useToast();
  const [mode, setMode] = useState<"simple" | "pay_due">("simple");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("Deposit");
  const [includePenalty, setIncludePenalty] = useState(true);

  const dues = useQuery({
    queryKey: queryKeys.dues(userId),
    queryFn: async () => (await api.get(`/users/${userId}/dues`)).data,
    enabled: !!userId,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
  const [dueId, setDueId] = useState<string | null>(null);
  const hasOpenDues = !!dues.data?.length;
  const selected = useMemo(() => dues.data?.find((d: any) => d._id === dueId), [dues.data, dueId]);
  const suggested = useMemo(() => {
    if (!selected) return 0;
    const today = new Date(date);
    const grace = selected.penaltyRule?.graceDays ?? 3;
    const pct = selected.penaltyRule?.monthlyPenaltyPct ?? 1.0;
    for (const item of selected.schedule as any[]) {
      if (item.status === "paid") continue;
      const base = (item.totalDue || 0) - (item.paid || 0);
      if (base <= 0) continue;
      const dueDate = new Date(item.dueDate);
      dueDate.setDate(dueDate.getDate() + grace);
      let total = base;
      if (includePenalty && today > dueDate && selected.penaltyRule?.enabled) {
        const penalty = Math.round((item.totalDue * pct) + Number.EPSILON) / 100;
        total = Math.round((total + penalty) * 100 + Number.EPSILON) / 100;
      }
      return total;
    }
    return 0;
  }, [selected, includePenalty, date]);

  useEffect(() => {
    if (mode === "pay_due" && hasOpenDues && dues.data && !dueId) {
      setDueId(dues.data[0]._id);
    }
  }, [mode, hasOpenDues, dues.data, dueId]);

  useEffect(() => {
    if (mode === "pay_due" && selected && amount === "") {
      const suggestedAmount = suggested;
      setAmount(suggestedAmount ? suggestedAmount.toFixed(2) : "");
    }
  }, [mode, selected, suggested]);

  // Reset amount when mode, target due, or penalty configuration changes
  useEffect(() => {
    setAmount("");
  }, [mode, dueId, includePenalty, userId]);

  useEffect(() => {
    if (!hasOpenDues && mode === "pay_due") setMode("simple");
  }, [hasOpenDues, mode]);

  const mutation = useMutation({
    mutationFn: (body: any) => api.post("/deposit", body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.txs(userId) });
      qc.invalidateQueries({ queryKey: queryKeys.home() });
      notify("Deposit recorded", "success");
      setAmount("");
    },
    onError: () => notify("Deposit failed", "error"),
  });

  const onSubmit = () => {
    const raw = Number(amount);
    // Normalize to 2dp to avoid floating-point drift (e.g. 1000.10 → 1000.0999...)
    const amt = isFinite(raw) ? Math.round(raw * 100 + Number.EPSILON) / 100 : 0;
    const payload: Record<string, any> = { userId, mode, date, note, includePenalty };
    payload.amount = amt || suggested;
    if (mode === "pay_due") payload.dueId = dueId;
    mutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 bg-white/80 dark:bg-slate-900/60 space-y-4">
        <header className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Deposit Type</h3>
        </header>

        {hasOpenDues ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ModeCard
              title="Simple deposit"
              body="Adds directly to member's savings balance."
              active={mode === "simple"}
              onClick={() => setMode("simple")}
            />
            <ModeCard
              title="Pay down a due"
              body="Allocates payment toward an active loan/due."
              active={mode === "pay_due"}
              onClick={() => setMode("pay_due")}
            />
          </div>
        ) : (
          <div className="text-sm text-slate-500 dark:text-slate-400">
            No active dues for this member. Recording as a regular deposit.
          </div>
        )}

        {mode === "pay_due" && hasOpenDues && (
          <div className="rounded-xl border border-blue-200/70 dark:border-blue-500/30 bg-blue-50/70 dark:bg-blue-500/10 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Target Loan / Due</h4>
              <span className="text-xs text-blue-700 dark:text-blue-300 font-semibold bg-blue-100 dark:bg-blue-500/20 px-2.5 py-0.5 rounded-full">
                {dues.data?.length || 0} open
              </span>
            </div>
            <Select className="h-11 text-sm" value={dueId || (dues.data?.[0]?._id ?? "")} onChange={(e) => setDueId(e.target.value)}>
              <option value="">Select due…</option>
              {dues.data?.map((d: any) => (
                <option key={d._id} value={d._id}>
                  Principal {formatAmount(d.principal)} — {d.months} mo @ {d.monthlyRatePct}%
                </option>
              ))}
            </Select>
            <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={includePenalty} onChange={(e) => setIncludePenalty(e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              Include penalty if past grace period
            </label>
            <div className="text-xs text-blue-800 dark:text-blue-200 bg-white/80 dark:bg-slate-900/60 rounded-lg px-3 py-2 inline-flex items-center gap-2 font-medium">
              <span className="h-2 w-2 bg-blue-500 rounded-full" aria-hidden />
              Suggested instalment: <strong className="font-bold">{formatAmount(suggested)}</strong>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 bg-white/80 dark:bg-slate-900/60 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Transaction Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-11 text-sm"
          />
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 text-sm"
          />
        </div>
        <Input
          label="Note"
          placeholder="e.g. Monthly contribution"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="h-11 text-sm"
        />
      </section>

      <div className="flex flex-wrap gap-3 justify-end">
        <Button onClick={onSubmit} isLoading={mutation.isPending} className="px-6 h-11 text-sm font-bold shadow-lg shadow-blue-500/20">
          Save Deposit
        </Button>
      </div>
    </div>
  );
}

export default memo(DepositForm);
