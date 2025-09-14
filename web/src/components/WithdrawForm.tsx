import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "./Toast";
import Button from "./Button";

export default function WithdrawForm({ userId }: { userId: string }) {
  const qc = useQueryClient();
  const { notify } = useToast();
  const [amount, setAmount] = useState(""); // BDT (taka)
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

  const [preview, setPreview] = useState<{ eligibleCount: number; rows: { userId: string; name: string; share: number }[] } | null>(null);
  useEffect(() => {
    const amtTaka = Number(amount);
    if (!amtTaka || amtTaka <= 0 || !isFinite(amtTaka)) { setPreview(null); return; }
    const excludeIds = excluded.join(",");
    api.get(`/preview/withdraw-split`, { params: { amount: amtTaka, excludeIds } })
      .then((r) => setPreview(r.data)).catch(() => setPreview(null));
  }, [amount, excluded]);

  const mutation = useMutation({
    mutationFn: (body: any) => api.post("/withdraw", body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["txs", userId] });
      qc.invalidateQueries({ queryKey: ["home"] });
      notify("Withdraw recorded", "success");
      setAmount("");
    },
    onError: () => notify("Withdraw failed", "error"),
  });
  const onSubmit = () => {
    const amtTaka = Number(amount);
    mutation.mutate({
      takerId: userId,
      amount: amtTaka,
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
        <input className="input w-full" type="number" step="0.01" placeholder="Amount (BDT)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input className="input w-full" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className="input w-full" type="number" min={1} placeholder="Months" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
        <input className="input w-full" type="number" step="0.1" placeholder="Monthly Rate %" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
      </div>
      <div className="grid grid-cols-3 gap-2 items-center text-sm">
        <label className="col-span-3 inline-flex items-center gap-2"><input type="checkbox" checked={penaltyEnabled} onChange={(e) => setPenaltyEnabled(e.target.checked)} /> Apply penalty when overdue</label>
        <input className="input" type="number" step="0.1" placeholder="Penalty %/mo" value={penaltyPct} onChange={(e) => setPenaltyPct(Number(e.target.value))} />
        <input className="input" type="number" placeholder="Grace days" value={graceDays} onChange={(e) => setGraceDays(Number(e.target.value))} />
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
                <span>{formatBDT(r.share)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="text-right">
        <Button variant="danger" onClick={onSubmit}>Withdraw</Button>
      </div>
    </div>
  );
}
