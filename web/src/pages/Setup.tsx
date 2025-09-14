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
    <div className="glass p-3 rounded max-w-lg animate-fade-in">
      <div className="font-medium mb-2">Setup</div>
      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-500">Change Password</div>
          <div className="flex gap-2">
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-primary" onClick={changePassword}>Update</button>
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
