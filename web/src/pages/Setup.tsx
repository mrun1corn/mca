import { useState } from "react";
import { api } from "../lib/api";
import { useToast } from "../components/Toast";
import PageHeader from "../components/layout/PageHeader";
import Panel from "../components/ui/Panel";
import Button from "../components/Button";

export default function Setup() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { notify } = useToast();

  const changePassword = async () => {
    try {
      await api.post("/auth/me/change-password", { currentPassword, newPassword: password });
      setMsg("Password changed");
      setPassword("");
      setCurrentPassword("");
      notify("Password updated", "success");
    } catch (e) {
      setMsg("Failed");
      notify("Password update failed", "error");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Setup"
        title="Tidy up your own access and learn the ground rules"
        description="Use this area to rotate your password and remind yourself how penalties and roles work."
      />

      <Panel title="Change your password" description="Only you can update your password. Use something you won’t share anywhere else.">
        <div className="grid gap-3">
          <input
            type="password"
            className="input h-11"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            className="input h-11"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 items-center">
            <Button disabled={!currentPassword || !password} onClick={changePassword}>
              Update password
            </Button>
            {msg && <span className="text-sm text-slate-500">{msg}</span>}
          </div>
          <p className="text-xs text-slate-500">
            Tip: share the change password instructions with new members so they can rotate their credentials themselves.
          </p>
        </div>
      </Panel>

      <Panel
        title="How penalties and roles behave"
        description="These reminders save you from hunting through docs when someone asks how things work."
      >
        <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc pl-5">
          <li>Penalty rules are picked per withdrawal. You can tweak the grace days or rate in the form itself.</li>
          <li>Admins can do everything, accountants can handle money but not people, and members only see their own balances.</li>
          <li>Need to change someone’s role? Head to the People page—we log the update automatically.</li>
        </ul>
      </Panel>
    </div>
  );
}
