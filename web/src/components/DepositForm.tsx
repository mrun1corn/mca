import { memo, ReactNode, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import Button from "./Button";
import { useToast } from "./Toast";

function DepositForm({ userId }: { userId: string }) {
  const qc = useQueryClient();
  const { notify } = useToast();
  const [mode, setMode] = useState<"simple" | "pay_due">("simple");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("Deposit");
  const [includePenalty, setIncludePenalty] = useState(true);

  const dues = useQuery({
    queryKey: ["dues", userId],
    queryFn: async () => (await api.get(`/users/${userId}/dues`)).data,
    enabled: !!userId,
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
        total += Math.floor((item.totalDue * pct) / 100);
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
      const taka = (suggested || 0) / 100;
      setAmount(taka ? taka.toFixed(2) : "");
    }
  }, [mode, selected, suggested]);

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
    onError: () => notify("Deposit failed", "error"),
  });

  const onSubmit = () => {
    const amtTaka = Number(amount);
    const payload: any = { userId, mode, date, note, includePenalty };
    if (amount) payload.amount = isFinite(amtTaka) ? amtTaka : 0;
    else payload.amountPoisha = suggested || 0;
    if (mode === "pay_due") payload.dueId = dueId;
    mutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4 bg-white/70 dark:bg-slate-900/40 space-y-4">
        <header className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Step 1</p>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Choose the intent</h3>
          </div>
          {hasOpenDues && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {mode === "simple" ? "Money stays flexible" : "We’ll target specific dues"}
            </span>
          )}
        </header>

        {hasOpenDues ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ModeCard
              title="Simple deposit"
              body="Keeps the balance free for future withdrawals."
              active={mode === "simple"}
              onClick={() => setMode("simple")}
            />
            <ModeCard
              title="Pay down a due"
              body="Apply this to their repayment schedule."
              active={mode === "pay_due"}
              onClick={() => setMode("pay_due")}
            />
          </div>
        ) : (
          <div className="text-sm text-slate-500 dark:text-slate-400">
            No dues are open, so we’ll treat it as a regular deposit.
          </div>
        )}

        {mode === "pay_due" && hasOpenDues && (
          <div className="rounded-2xl border border-blue-100 dark:border-blue-500/30 bg-blue-50/60 dark:bg-blue-500/10 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Target a due</h4>
              <span className="text-xs text-blue-600 dark:text-blue-200 font-medium bg-blue-100/70 dark:bg-blue-500/20 px-2 py-0.5 rounded-full">
                {dues.data?.length || 0} open
              </span>
            </div>
            <select className="input w-full h-12" value={dueId || (dues.data?.[0]?._id ?? "")} onChange={(e) => setDueId(e.target.value)}>
              <option value="">Select due…</option>
              {dues.data?.map((d: any) => (
                <option key={d._id} value={d._id}>
                  Principal {formatBDT(d.principal)} — {d.months} mo @ {d.monthlyRatePct}%
                </option>
              ))}
            </select>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={includePenalty} onChange={(e) => setIncludePenalty(e.target.checked)} />
              Add penalty when grace period is over
            </label>
            <div className="text-xs text-blue-700 dark:text-blue-200 bg-white/60 dark:bg-slate-900/40 rounded-xl px-3 py-2 inline-flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-500 rounded-full" aria-hidden />
              Suggested instalment: <strong>{formatBDT(suggested)}</strong>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4 bg-white/80 dark:bg-slate-900/50 space-y-4">
        <header>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Step 2</p>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Fill in the details</h3>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Amount (BDT)">
            <input
              className="input w-full h-12"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Field>
          <Field label="Date">
            <input className="input w-full h-12" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
        </div>
        <Field label="Note for future you" hint="Plain words help everyone understand later.">
          <input
            className="input w-full"
            placeholder="e.g. Weekly market sales"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Field>
      </section>

      <div className="flex flex-wrap gap-3 justify-end">
        <Button onClick={onSubmit} className="px-6 h-12 text-base font-semibold shadow-lg shadow-blue-500/20">
          Save deposit
        </Button>
      </div>
    </div>
  );
}

function ModeCard({
  title,
  body,
  active,
  onClick,
}: {
  title: string;
  body: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-2xl border p-4 transition ${
        active
          ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400/60 dark:bg-blue-500/10 dark:text-blue-100 shadow"
          : "border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50/60 dark:border-slate-700 dark:text-slate-300"
      }`}
    >
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs mt-1 text-slate-500 dark:text-slate-400">{body}</div>
    </button>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</label>
        {hint ? <span className="text-xs text-slate-400">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

export default memo(DepositForm);
