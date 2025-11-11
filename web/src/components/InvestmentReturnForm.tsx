import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import Button from "./Button";
import { useToast } from "./Toast";

type InvestmentRow = {
  id: string;
  name: string;
  amountPoisha: number;
  expectedInterestPoisha: number;
  months: number;
  monthlyRatePct: number;
  startDate: string;
  status: "active" | "completed";
  returnedPoisha?: number;
};

export default function InvestmentReturnForm() {
  const { notify } = useToast();
  const qc = useQueryClient();
  const { data: investments, isLoading } = useQuery<InvestmentRow[]>({
    queryKey: ["investments"],
    queryFn: async () => (await api.get("/investments")).data,
  });

  const activeInvestments = useMemo(() => investments?.filter((inv) => inv.status === "active") ?? [], [investments]);
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("Investment return");
  const [markCompleted, setMarkCompleted] = useState(true);

  useEffect(() => {
    if (!selectedId && activeInvestments[0]) setSelectedId(activeInvestments[0].id);
  }, [activeInvestments, selectedId]);

  const selectedInvestment = activeInvestments.find((inv) => inv.id === selectedId);

  useEffect(() => {
    if (!selectedInvestment) return;
    const suggested =
      (selectedInvestment.amountPoisha + selectedInvestment.expectedInterestPoisha - (selectedInvestment.returnedPoisha || 0)) / 100;
    if (!amount && suggested > 0) {
      setAmount(suggested.toFixed(2));
    }
    setNote((prev) => {
      if (!prev || prev === "Investment return" || prev.startsWith("Investment return:")) {
        return `Investment return: ${selectedInvestment.name}`;
      }
      return prev;
    });
  }, [selectedInvestment]);

  const mutation = useMutation({
    mutationFn: (body: any) => api.post(`/investments/${selectedId}/return`, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["home"] });
      qc.invalidateQueries({ queryKey: ["investments"] });
      notify("Investment return recorded", "success");
      setAmount("");
      setMarkCompleted(true);
    },
    onError: (err: any) => notify(err?.response?.data?.error || "Failed to record investment return", "error"),
  });

  const onSubmit = () => {
    const amt = Number(amount);
    if (!selectedId || !amt || !isFinite(amt)) return;
    mutation.mutate({ amount: amt, date, note, markCompleted });
  };

  if (isLoading) {
    return <div className="text-sm text-slate-500 dark:text-slate-400">Loading investments…</div>;
  }

  if (!activeInvestments.length) {
    return <div className="text-sm text-slate-500 dark:text-slate-400">No active investments to return yet.</div>;
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Which investment is returning?</label>
        <select className="input w-full h-12" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          {activeInvestments.map((inv) => (
            <option key={inv.id} value={inv.id}>
              {inv.name} · {formatBDT(inv.amountPoisha)} out
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Amount returning (BDT)</label>
          <input
            className="input w-full h-12"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {selectedInvestment ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Expected total:{" "}
              {formatBDT(selectedInvestment.amountPoisha + selectedInvestment.expectedInterestPoisha - (selectedInvestment.returnedPoisha || 0))}
            </p>
          ) : null}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Date received</label>
          <input className="input w-full h-12" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Note</label>
        <input className="input w-full" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
        <input type="checkbox" checked={markCompleted} onChange={(e) => setMarkCompleted(e.target.checked)} />
        Mark this investment as completed
      </label>
      <div className="flex justify-end">
        <Button onClick={onSubmit} disabled={mutation.isPending || !selectedId} className="px-4 h-11">
          {mutation.isPending ? "Saving…" : "Record return"}
        </Button>
      </div>
    </div>
  );
}
