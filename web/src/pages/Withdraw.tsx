import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useEffect, useState } from "react";
import WithdrawForm from "../components/WithdrawForm";

export default function WithdrawPage() {
  const users = useQuery({ queryKey: ["users"], queryFn: async () => (await api.get(`/users`)).data });
  const [userId, setUserId] = useState<string>("");
  useEffect(() => { if (!userId && users.data?.[0]) setUserId(users.data[0].id); }, [users.data]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 glass p-3 rounded animate-fade-in">
        <div className="flex gap-2 mb-3 items-center">
          <label className="text-sm w-24">Member</label>
          <select className="input w-full" value={userId} onChange={(e) => setUserId(e.target.value)}>
            {users.data?.map((u: any) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>
        {userId && <WithdrawForm userId={userId} />}
      </div>
      <div className="space-y-4">
        <div className="glass p-3 rounded animate-fade-in">
          <div className="font-medium mb-2">Notes</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Exclude members to re-calculate their share. Last eligible member gets the remainder after floor split.</div>
        </div>
      </div>
    </div>
  );
}
