import { Link, NavLink, Route, Routes, Navigate, useNavigate } from "react-router-dom";
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

function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 640) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <nav className="bg-white dark:bg-gray-800 shadow text-gray-800 dark:text-gray-100">
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
          <NavLink className={({isActive}) => `flex items-center gap-1.5 hover:text-blue-600 ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`} to="/"><HomeIcon/> Home</NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-1.5 hover:text-blue-600 ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`} to="/people"><UsersIcon/> People</NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-1.5 hover:text-blue-600 ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`} to="/deposit"><DepositIcon/> Deposit</NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-1.5 hover:text-blue-600 ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`} to="/withdraw"><WithdrawIcon/> Withdraw</NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-1.5 hover:text-blue-600 ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`} to="/export"><ExportIcon/> Export</NavLink>
          <NavLink className={({isActive}) => `flex items-center gap-1.5 hover:text-blue-600 ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`} to="/setup"><CogIcon/> Setup</NavLink>
        </div>
      </div>
      {open && (
        <div className="sm:hidden px-3 pb-3 animate-fade-in bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-col gap-2">
            <Link className="flex items-center gap-2" onClick={() => setOpen(false)} to="/"><HomeIcon/> Home</Link>
            <Link className="flex items-center gap-2" onClick={() => setOpen(false)} to="/people"><UsersIcon/> People</Link>
            <Link className="flex items-center gap-2" onClick={() => setOpen(false)} to="/deposit"><MoneyIcon/> Deposit</Link>
            <Link className="flex items-center gap-2" onClick={() => setOpen(false)} to="/withdraw"><MoneyIcon/> Withdraw</Link>
            <Link className="flex items-center gap-2" onClick={() => setOpen(false)} to="/export"><ExportIcon/> Export</Link>
            <Link className="flex items-center gap-2" onClick={() => setOpen(false)} to="/setup"><CogIcon/> Setup</Link>
          </div>
        </div>
      )}
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

export default function App() {
  const navigate = useNavigate();
  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };
  useEffect(() => { document.title = APP_NAME; }, []);
  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <Nav />
        <div className="p-3 sm:p-4 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <ThemeToggle />
            <button onClick={logout} className="inline-flex items-center gap-1.5 text-sm text-blue-600 underline transition-opacity hover:opacity-80"><LogoutIcon/> Logout</button>
          </div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/people" element={<RequireAuth><People /></RequireAuth>} />
            <Route path="/deposit" element={<RequireAuth><DepositPage /></RequireAuth>} />
            <Route path="/withdraw" element={<RequireAuth><WithdrawPage /></RequireAuth>} />
            <Route path="/export" element={<RequireAuth><Export /></RequireAuth>} />
            <Route path="/setup" element={<RequireAuth><Setup /></RequireAuth>} />
          </Routes>
        </div>
      </div>
    </ToastProvider>
  );
}
