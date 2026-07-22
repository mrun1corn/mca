import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import Button from "../components/Button";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) return;
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { identifier, password });
      if (res.data?.user) {
        localStorage.setItem("hasSession", "true");
        setUser(res.data.user);
      }
      navigate("/");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Invalid credentials. Please verify your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-md">
        {/* Glow ambient decoration */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/20 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/20 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <section className="relative w-full glass rounded-3xl p-7 sm:p-9 shadow-2xl space-y-6 animate-page-fade border border-white/60 dark:border-slate-800/80">
          <header className="text-center space-y-3">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Community Savings</p>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">Welcome Back</h1>
            </div>
          </header>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email or Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. admin@example.com"
                  className="w-full input h-11 pl-10 text-sm"
                  autoComplete="username"
                />
                <svg className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full input h-11 pl-10 pr-10 text-sm"
                  autoComplete="current-password"
                />
                <svg className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 012.122-.063c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-1.974-1.974a3 3 0 11-4.243-4.243m4.243 4.243L3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error ? (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            ) : null}

            <Button
              className="w-full h-11 text-sm font-bold shadow-lg shadow-blue-500/25 mt-2"
              disabled={loading || !identifier || !password}
              isLoading={loading}
            >
              Sign In
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
