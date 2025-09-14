import { Link, NavLink, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import People from "./pages/People";
import DepositPage from "./pages/Deposit";
import WithdrawPage from "./pages/Withdraw";
import Export from "./pages/Export";
import Setup from "./pages/Setup";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { api } from "./lib/api";
import { HomeIcon, UsersIcon, MoneyIcon, ExportIcon, CogIcon, LogoutIcon, DepositIcon, WithdrawIcon } from "./components/Icon";
import { APP_NAME, APP_LOGO } from "./lib/config";
import ThemeToggle from "./components/ThemeToggle";
import { ToastProvider } from "./components/Toast";
import { useQuery } from "@tanstack/react-query";

function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const me = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get("/me")).data });
  const role = me.data?.role as undefined | "admin" | "accountant" | "user";
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 640) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };
  return (
    <nav className="bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-900/50 dark:to-gray-800/40 backdrop-blur-sm shadow text-gray-800 dark:text-gray-100">
      <div className="max-w-6xl mx-auto px-3 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold inline-flex items-center gap-2">
          {APP_LOGO ? <img src={APP_LOGO} alt="logo" className="h-6 w-6 object-contain" /> : null}
          <span>{APP_NAME}</span>
        </Link>
        <button className="sm:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          <span className="block w-5 h-0.5 bg-gray-700 dark:bg-gray-200 mb-1"></span>
          <span className="block w-5 h-0.5 bg-gray-700 dark:bg-gray-200 mb-1"></span>
          <span className="block w-5 h-0.5 bg-gray-700 dark:bg-gray-200"></span>
        </button>
        <div className="hidden sm:flex gap-5 items-center">
          <NavLink className={({isActive}) => `flex items-center gap-1.5 hover:text-blue-600 ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`} to="/"><HomeIcon className="w-4 h-4"/> Home</NavLink>
          {role === 'admin' && (
            <NavLink className={({isActive}) => `flex items-center gap-1.5 hover:text-blue-600 ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`} to="/people"><UsersIcon className="w-4 h-4"/> Members</NavLink>
          )}
          {(role === 'admin' || role === 'accountant') && (
            <>
              <NavLink className={({isActive}) => `flex items-center gap-1.5 hover:text-blue-600 ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`} to="/deposit"><DepositIcon className="w-4 h-4"/> Deposit</NavLink>
              <NavLink className={({isActive}) => `flex items-center gap-1.5 hover:text-blue-600 ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`} to="/withdraw"><WithdrawIcon className="w-4 h-4"/> Withdraw</NavLink>
              <NavLink className={({isActive}) => `flex items-center gap-1.5 hover:text-blue-600 ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`} to="/export"><ExportIcon className="w-4 h-4"/> Export</NavLink>
            </>
          )}
          <NavLink className={({isActive}) => `flex items-center gap-1.5 hover:text-blue-600 ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`} to="/setup"><CogIcon className="w-4 h-4"/> Settings</NavLink>
          <button onClick={logout} className="inline-flex items-center gap-1.5 text-sm text-blue-600 underline transition-opacity hover:opacity-80"><LogoutIcon className="w-4 h-4"/> Logout</button>
        </div>
      </div>
      <div className={`sm:hidden overflow-hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 transition-all duration-200 ease-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`px-3 pb-3 transform origin-top transition-transform duration-200 ${open ? 'scale-y-100' : 'scale-y-95'}`}>
          <div className="flex flex-col gap-2">
            <Link className="flex items-center gap-2" onClick={() => setOpen(false)} to="/"><HomeIcon/> Home</Link>
            {role === 'admin' && (
              <Link className="flex items-center gap-2" onClick={() => setOpen(false)} to="/people"><UsersIcon/> People</Link>
            )}
            {(role === 'admin' || role === 'accountant') && (
              <>
                <Link className="flex items-center gap-2" onClick={() => setOpen(false)} to="/deposit"><MoneyIcon/> Deposit</Link>
                <Link className="flex items-center gap-2" onClick={() => setOpen(false)} to="/withdraw"><MoneyIcon/> Withdraw</Link>
                <Link className="flex items-center gap-2" onClick={() => setOpen(false)} to="/export"><ExportIcon/> Export</Link>
              </>
            )}
            <Link className="flex items-center gap-2" onClick={() => setOpen(false)} to="/setup"><CogIcon/> Setup</Link>
            <button className="flex items-center gap-2 text-left text-blue-600 underline" onClick={() => { setOpen(false); logout(); }}><LogoutIcon/> Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    api.get("/home").then(() => setOk(true)).catch(() => setOk(false)).finally(() => setLoading(false));
  }, []);
  if (loading) return <div className="p-4">Loading...</div>;
  if (!ok) return <Navigate to="/login" replace />;
  return children;
}

function RequireRole({ roles, children }: { roles: Array<"admin"|"accountant">; children: JSX.Element }) {
  const { data, isLoading } = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get("/me")).data });
  if (isLoading) return <div className="p-4">Loading...</div>;
  const role = data?.role as any;
  if (!roles.includes(role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login";
  // Ensure dark mode applies even when ThemeToggle is hidden (e.g., on /login)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = saved === "dark" || (!saved && prefersDark) ? "dark" : "light";
      const root = document.documentElement;
      if (theme === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
    } catch {}
  }, []);
  useEffect(() => { document.title = APP_NAME; }, []);
  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        {!isAuthPage && <Nav />}
        <div className="p-3 sm:p-4 max-w-6xl mx-auto">
          <div className="flex items-center justify-end mb-2">
            <ThemeToggle />
          </div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/people" element={<RequireAuth><RequireRole roles={["admin"]}><People /></RequireRole></RequireAuth>} />
            <Route path="/deposit" element={<RequireAuth><RequireRole roles={["admin","accountant"]}><DepositPage /></RequireRole></RequireAuth>} />
            <Route path="/withdraw" element={<RequireAuth><RequireRole roles={["admin","accountant"]}><WithdrawPage /></RequireRole></RequireAuth>} />
            <Route path="/export" element={<RequireAuth><RequireRole roles={["admin","accountant"]}><Export /></RequireRole></RequireAuth>} />
            <Route path="/setup" element={<RequireAuth><Setup /></RequireAuth>} />
          </Routes>
        </div>
      </div>
    </ToastProvider>
  );
}
