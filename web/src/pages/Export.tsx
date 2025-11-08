import { api } from "../lib/api";
import { DownloadIcon } from "../components/Icon";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../components/layout/PageHeader";

export default function Export() {
  const base = api.defaults.baseURL?.replace(/\/$/, "") || "";
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const users = useQuery({ queryKey: ["users"], queryFn: async () => (await api.get(`/users`)).data });
  const qs = new URLSearchParams();
  if (from) qs.set("from", from);
  if (to) qs.set("to", to);
  if (userId) qs.set("userId", userId);
  const qstr = qs.toString();

  const summaryHref = `${base}/export/summary.csv${qstr ? "?" + qstr : ""}`;
  const ledgerHref = `${base}/export/ledger.csv${qstr ? "?" + qstr : ""}`;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Exports"
        title="Download numbers you can share in WhatsApp or at the meeting"
        description="Choose a date range (optional), narrow it to a single member if needed, then download the format that suits the conversation."
      />

      <section className="glass rounded-3xl p-6 shadow-lg space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">From date</label>
            <input type="date" className="input" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">To date</label>
            <input type="date" className="input" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Filter by member (optional)</label>
            <select className="input" value={userId} onChange={(e) => setUserId(e.target.value)}>
              <option value="">Everyone</option>
              {users.data?.map((u: any) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-end">
            Leave any field blank if you don’t need that filter.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a className="btn btn-primary flex-1 justify-center" href={summaryHref} target="_blank" rel="noreferrer">
            <DownloadIcon className="w-4 h-4" /> Summary CSV
          </a>
          <a className="btn btn-secondary flex-1 justify-center" href={ledgerHref} target="_blank" rel="noreferrer">
            <DownloadIcon className="w-4 h-4" /> Detailed ledger
          </a>
        </div>

        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4 text-sm text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/50">
          <p className="font-medium text-slate-900 dark:text-white">What’s what?</p>
          <ul className="mt-2 space-y-1.5 list-disc pl-5">
            <li>Summary CSV = one row per member with deposits, withdrawals, and balance.</li>
            <li>Ledger CSV = every transaction, perfect for auditors or spreadsheets.</li>
            <li>Filters apply to both downloads. Use them to prep for monthly reviews.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
