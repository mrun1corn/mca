import { useState } from "react";
import { useToast } from "../components/Toast";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { notify } = useToast();
  const [showChange, setShowChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/login", { identifier, password });
      navigate("/");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Login failed");
    }
  };

  const onChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/change-password", { email, currentPassword: password, newPassword });
      notify("Password updated", "success");
      setShowChange(false);
      setNewPassword("");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Change password failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 p-6 shadow rounded mt-10 animate-fade-in">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Email or Username" className="w-full border p-2 rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded transition-transform active:scale-[0.98]">Sign in</button>
      </form>
      <div className="mt-3 text-sm text-gray-500">
        <button className="underline hover:opacity-80" onClick={() => setShowChange((v) => !v)}>
          {showChange ? "Hide change password" : "Change password"}
        </button>
      </div>
      {showChange && (
        <form onSubmit={onChangePassword} className="mt-3 space-y-2 text-sm">
          <div className="text-gray-600 dark:text-gray-300">Enter email, current password above, and new password here.</div>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" className="w-full border p-2 rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
          <button className="bg-gray-700 text-white px-4 py-2 rounded transition-transform active:scale-[0.98]">Update password</button>
        </form>
      )}
    </div>
  );
}
