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
      <div className="glass p-3 rounded animate-fade-in">
        <div className="font-medium mb-2">Download CSV</div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-3">
          <input type="date" className="input" value={from} onChange={(e) => setFrom(e.target.value)} />
          <input type="date" className="input" value={to} onChange={(e) => setTo(e.target.value)} />
          <select className="input" value={userId} onChange={(e) => setUserId(e.target.value)}>
            <option value="">All users</option>
            {users.data?.map((u: any) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center">Optional filters (range + user)</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4">
          <a className="btn btn-ghost" href={`${base}/export/summary.csv${qstr ? '?' + qstr : ''}`} target="_blank"><DownloadIcon/> Summary CSV</a>
          <a className="btn btn-ghost" href={`${base}/export/ledger.csv${qstr ? '?' + qstr : ''}`} target="_blank"><DownloadIcon/> Ledger CSV{userId ? ' (User)' : ''}</a>
        </div>
        <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">Click a link to download. Summary aggregates per member; Ledger lists transactions. Apply optional range and user filters above.</div>
      </div>
    </div>
  );
}
