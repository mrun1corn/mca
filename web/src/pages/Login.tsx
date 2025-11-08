import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/login", { identifier, password });
      navigate("/");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Login failed. Double-check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md glass rounded-3xl p-6 sm:p-8 shadow-lg space-y-6 animate-fade-in">
        <header className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Community savings</p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Sign in</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Only trusted admins/accountants have access. Use the credentials shared with you.
          </p>
        </header>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Email or username</label>
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. robin@example.com"
              className="w-full input h-12"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full input h-12"
            />
          </div>
          {error ? <div className="text-sm text-rose-600 dark:text-rose-400">{error}</div> : null}
          <Button className="w-full h-12 text-base" disabled={loading || !identifier || !password}>
            {loading ? "Signing you in…" : "Enter the workspace"}
          </Button>
        </form>
      </section>
    </div>
  );
}
