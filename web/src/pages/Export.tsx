import { api } from "../lib/api";
import { DownloadIcon } from "../components/Icon";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

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
  return (
    <div className="space-y-3">
      <div className="bg-white dark:bg-gray-800 p-3 shadow rounded animate-fade-in">
        <div className="font-medium mb-2">CSV Exports</div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-3">
          <input type="date" className="border p-2 rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" value={from} onChange={(e) => setFrom(e.target.value)} />
          <input type="date" className="border p-2 rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" value={to} onChange={(e) => setTo(e.target.value)} />
          <select className="border p-2 rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" value={userId} onChange={(e) => setUserId(e.target.value)}>
            <option value="">All users</option>
            {users.data?.map((u: any) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center">Optional filters (range + user)</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4">
          <a className="inline-flex items-center gap-2 text-blue-600 underline hover:opacity-80" href={`${base}/export/summary.csv${qstr ? '?' + qstr : ''}`} target="_blank"><DownloadIcon/> Summary CSV</a>
          <a className="inline-flex items-center gap-2 text-blue-600 underline hover:opacity-80" href={`${base}/export/ledger.csv${qstr ? '?' + qstr : ''}`} target="_blank"><DownloadIcon/> Ledger CSV{userId ? ' (User)' : ''}</a>
        </div>
        <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">Click a link to download. Summary aggregates per member; Ledger lists transactions. Apply optional range and user filters above.</div>
      </div>
    </div>
  );
}
