import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const bulletPoints = [
  "See every deposit, withdrawal, and planned investment in one place.",
  "Use language your members understand—no corporate jargon.",
  "Share transparent numbers before every meeting.",
];

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
    <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.1fr_0.9fr] mt-10 animate-fade-in px-2">
      <section className="glass rounded-3xl p-6 sm:p-10 shadow-lg">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Community savings workspace</p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mt-4">
          Bring every contribution and promise into one calm dashboard.
        </h1>
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-300 mt-4 max-w-2xl">
          Credentials are shared with the finance committee only. If you’re new, ask the admin to create a login for you.
        </p>
        <ul className="mt-6 space-y-3">
          {bulletPoints.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-8 text-xs text-slate-400">
          Need a reset? Ask another admin to update your password from the Setup page.
        </div>
      </section>

      <section className="glass rounded-3xl p-6 sm:p-8 shadow-lg max-w-lg w-full mx-auto">
        <div className="space-y-1 mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Sign in</p>
          <h2 className="text-2xl font-semibold">Use the details shared with you</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            We’ll drop secure session cookies when you sign in. No installation needed.
          </p>
        </div>
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
