import { useState } from "react";
import { api } from "../lib/api";
import { useToast } from "../components/Toast";

export default function Setup() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { notify } = useToast();

  const changePassword = async () => {
    try {
      const me = await api.get("/me");
      await api.patch(`/users/${me.data.id}`, { password });
      setMsg("Password changed");
      setPassword("");
      notify("Password updated", "success");
    } catch (e) {
      setMsg("Failed");
      notify("Password update failed", "error");
    }
  };
  return (
    <div className="bg-white p-3 shadow rounded max-w-lg animate-fade-in">
      <div className="font-medium mb-2">Setup</div>
      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-500">Change Password</div>
          <div className="flex gap-2">
            <input type="password" className="border p-2 rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-blue-600 text-white px-3 rounded transition-transform active:scale-[0.98]" onClick={changePassword}>Update</button>
          </div>
          {msg && <div className="text-sm text-gray-600 mt-1">{msg}</div>}
        </div>
        <div>
          <div className="text-sm text-gray-500">Penalty Settings (UI only)</div>
          <div className="text-xs text-gray-500">Penalty rules are set when creating dues on withdraw; adjust on the Withdraw form.</div>
        </div>
      </div>
    </div>
  );
}
