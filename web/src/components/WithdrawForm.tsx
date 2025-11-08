import { memo, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import { useToast } from "./Toast";
import Button from "./Button";

type PreviewResponse = { eligibleCount: number; rows: { userId: string; name: string; share: number }[] };

function WithdrawForm({ userId }: { userId?: string }) {
  const qc = useQueryClient();
  const { notify } = useToast();
  const allowModeToggle = !userId;
  const [mode, setMode] = useState<"member" | "investment">("member");
  const effectiveMode = userId ? "member" : mode;
  const [takerId, setTakerId] = useState("");
  const [amount, setAmount] = useState(""); // BDT (taka)
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [months, setMonths] = useState(3);
  const [rate, setRate] = useState(2);
  const [penaltyEnabled, setPenaltyEnabled] = useState(true);
  const [penaltyPct, setPenaltyPct] = useState(1);
  const [graceDays, setGraceDays] = useState(3);
  const [investmentName, setInvestmentName] = useState("");
  const [investmentStart, setInvestmentStart] = useState(() => new Date().toISOString().slice(0, 10));
  const [investmentMonths, setInvestmentMonths] = useState(6);
  const [investmentRate, setInvestmentRate] = useState(3);

  const users = useQuery({ queryKey: ["users"], queryFn: async () => (await api.get(`/users`)).data });
  useEffect(() => {
    if (userId) {
      setTakerId(userId);
      return;
    }
    if (!takerId && users.data?.length) setTakerId(users.data[0].id);
  }, [users.data, takerId, userId]);

  const selectableMembers = useMemo(() => {
    if (!users.data) return [];
    if (effectiveMode === "member") return users.data.filter((u: any) => u.id !== takerId);
    return users.data;
  }, [users.data, takerId, effectiveMode]);

  const [excluded, setExcluded] = useState<string[]>([]);
  useEffect(() => {
    if (effectiveMode === "member") setExcluded((prev) => prev.filter((id) => id !== takerId));
  }, [effectiveMode, takerId]);
  const toggleExcluded = (id: string) => setExcluded((arr) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]));

  const [preview, setPreview] = useState<PreviewResponse | null>(null);
  useEffect(() => {
    const amtTaka = Number(amount);
    if (!amtTaka || amtTaka <= 0 || !isFinite(amtTaka)) {
      setPreview(null);
      return;
    }
    const excludeIds = excluded.join(",");
    api
      .get(`/preview/withdraw-split`, { params: { amount: amtTaka, excludeIds } })
      .then((r) => setPreview(r.data))
      .catch(() => setPreview(null));
  }, [amount, excluded]);

  const withdrawMutation = useMutation({
    mutationFn: (body: any) => api.post("/withdraw", body),
    onSuccess: () => {
      if (takerId) qc.invalidateQueries({ queryKey: ["txs", takerId] });
      qc.invalidateQueries({ queryKey: ["home"] });
      notify("Withdraw recorded", "success");
      setAmount("");
    },
    onError: () => notify("Withdraw failed", "error"),
  });

  const investmentMutation = useMutation({
    mutationFn: (body: any) => api.post("/investments", body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["home"] });
      notify("Investment recorded", "success");
      setAmount("");
      setInvestmentName("");
    },
    onError: () => notify("Investment failed", "error"),
  });

  const onSubmit = () => {
    const amtTaka = Number(amount);
    if (!amtTaka || !isFinite(amtTaka)) return;
    if (effectiveMode === "member") {
      withdrawMutation.mutate({
        takerId,
        amount: amtTaka,
        date,
        reason: "Withdraw",
        excludeMemberIds: excluded,
        due: { useDefaultDate: true, defaultDate: date, startDate: null, endDate: null, months, monthlyRatePct: rate },
        penalty: { enabled: penaltyEnabled, monthlyPenaltyPct: penaltyPct, graceDays },
      });
    } else {
      investmentMutation.mutate({
        name: investmentName || `Investment ${new Date(investmentStart).toLocaleDateString()}`,
        amount: amtTaka,
        startDate: investmentStart,
        months: investmentMonths,
        monthlyRatePct: investmentRate,
        excludeMemberIds: excluded,
      });
    }
  };

  return (
    <div className="space-y-6">
      {allowModeToggle && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">What kind of outflow are we recording?</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="withdraw-mode" checked={mode === "member"} onChange={() => setMode("member")} />
              Cash-out to a member
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="withdraw-mode" checked={mode === "investment"} onChange={() => setMode("investment")} />
              Invest externally
            </label>
          </div>
        </div>
      )}

      {effectiveMode === "member" && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Who receives the money?</label>
          {userId ? (
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              {users.data?.find((u: any) => u.id === userId)?.name || userId}
            </p>
          ) : (
            <select className="input w-full h-12" value={takerId} onChange={(e) => setTakerId(e.target.value)}>
              {users.data?.map((u: any) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          )}
          <p className="text-xs text-slate-500">We’ll build the repayment plan as soon as you save this.</p>
        </div>
      )}

      {effectiveMode === "investment" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Investment name</label>
            <input
              className="input w-full"
              placeholder="e.g. Community fridge fund"
              value={investmentName}
              onChange={(e) => setInvestmentName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Start date</label>
            <input className="input w-full" type="date" value={investmentStart} onChange={(e) => setInvestmentStart(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Months invested</label>
            <input className="input w-full" type="number" min={1} value={investmentMonths} onChange={(e) => setInvestmentMonths(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Monthly interest %</label>
            <input className="input w-full" type="number" step="0.1" value={investmentRate} onChange={(e) => setInvestmentRate(Number(e.target.value))} />
          </div>
        </div>
      )}

      {effectiveMode === "member" && (
        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4 space-y-3 bg-white/60 dark:bg-slate-900/40">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Repayment plan</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="input w-full" type="number" min={1} placeholder="Months" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
            <input className="input w-full" type="number" step="0.1" placeholder="Monthly rate %" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={penaltyEnabled} onChange={(e) => setPenaltyEnabled(e.target.checked)} />
            Apply penalty when overdue
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input className="input" type="number" step="0.1" placeholder="Penalty %/mo" value={penaltyPct} onChange={(e) => setPenaltyPct(Number(e.target.value))} />
            <input className="input" type="number" placeholder="Grace days" value={graceDays} onChange={(e) => setGraceDays(Number(e.target.value))} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Amount (BDT)</label>
          <input className="input w-full h-12" type="number" step="0.01" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Date</label>
          <input className="input w-full h-12" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-sm font-medium mb-2">
          <span>Exclude members from this split</span>
          <span className="text-xs text-slate-500">{preview ? `${preview.eligibleCount} sharing` : "Everyone is sharing"}</span>
        </div>
        <div className="max-h-32 overflow-auto border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-sm space-y-1.5 bg-white/70 dark:bg-slate-900/40">
          {selectableMembers.map((m: any) => (
            <label key={m.id} className="flex items-center gap-2 py-0.5">
              <input type="checkbox" checked={excluded.includes(m.id)} onChange={() => toggleExcluded(m.id)} />
              <span>{m.name}</span>
            </label>
          ))}
          {selectableMembers.length === 0 && <div className="text-slate-500">No members available</div>}
        </div>
      </div>

      {preview && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs uppercase tracking-[0.3em] text-slate-400 px-4 pt-4">Split preview</div>
          <div className="max-h-36 overflow-auto">
            {preview.rows.map((r) => (
              <div key={r.userId} className="flex justify-between px-4 py-2 border-b last:border-b-0 border-slate-100 dark:border-slate-800 text-sm">
                <span className="truncate pr-4">{r.name}</span>
                <span className="font-medium">{formatBDT(r.share)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-right">
        <Button
          variant="danger"
          onClick={onSubmit}
          disabled={!amount || (effectiveMode === "member" && !takerId)}
        >
          {effectiveMode === "member" ? "Record withdrawal" : "Record investment"}
        </Button>
      </div>
    </div>
  );
}

export default memo(WithdrawForm);
