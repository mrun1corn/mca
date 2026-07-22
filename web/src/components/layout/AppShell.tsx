import { ReactNode, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "../../lib/api";
import { APP_NAME } from "../../lib/config";
import ThemeToggle from "../ThemeToggle";
import { useAuth } from "../../App";
import {
  HomeIcon,
  UsersIcon,
  DepositIcon,
  WithdrawIcon,
  ExportIcon,
  CogIcon,
  LogoutIcon,
  MoneyIcon,
} from "../Icon";

type Role = "admin" | "accountant" | "user";

type NavItem = {
  label: string;
  description: string;
  to: string;
  icon: (props: { className?: string }) => JSX.Element;
  roles?: Role[];
};

const navItems: NavItem[] = [
  { label: "Snapshot", description: "Balances, dues, and trends", to: "/", icon: HomeIcon },
  { label: "People", description: "Invite and manage members", to: "/people", icon: UsersIcon, roles: ["admin"] },
  { label: "Deposits", description: "Record savings in seconds", to: "/deposit", icon: DepositIcon, roles: ["admin", "accountant"] },
  {
    label: "Withdraw & Invest",
    description: "Loans, splits, and investments",
    to: "/withdraw",
    icon: WithdrawIcon,
    roles: ["admin", "accountant"],
  },
  { label: "Exports", description: "Download CSV summaries", to: "/export", icon: ExportIcon, roles: ["admin", "accountant"] },
  {
    label: "Yearly collection",
    description: "See deposit totals by year",
    to: "/yearly",
    icon: MoneyIcon,
    roles: ["admin", "accountant"],
  },
  { label: "Setup", description: "Preferences and account", to: "/setup", icon: CogIcon },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: me } = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get("/me")).data });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { setUser } = useAuth();

  const role = (me?.role ?? "user") as Role;
  const filteredNav = navItems.filter((item) => !item.roles || item.roles.includes(role));

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
      localStorage.removeItem("hasSession");
      localStorage.setItem("logout", Date.now().toString());
      window.dispatchEvent(new StorageEvent("storage", { key: "logout" }));
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex">
      <aside className="hidden lg:flex w-72 flex-col border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="px-6 pt-7 pb-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Community Savings</div>
          <div className="text-2xl font-extrabold mt-0.5 text-slate-900 dark:text-white tracking-tight">{APP_NAME}</div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {filteredNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 border text-sm font-semibold transition-colors duration-100",
                  isActive
                    ? "border-blue-500/30 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-200"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/60",
                ].join(" ")
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 space-y-2 border-t border-slate-100 dark:border-slate-800">
          <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 p-3 bg-slate-50/70 dark:bg-slate-950/50 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{me?.name || "Member"}</p>
              <p className="text-[11px] font-medium text-slate-400 capitalize">{role}</p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
              title="Sign out"
            >
              <LogoutIcon className="w-4 h-4" />
            </button>
          </div>
          <ThemeToggle />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 flex items-center justify-between gap-3 sticky top-0 z-30">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Community Savings</p>
            <p className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">{APP_NAME}</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 p-2 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-expanded={mobileNavOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-0.5 w-5 rounded-full bg-current transition-transform ${mobileNavOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition-opacity ${mobileNavOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition-transform ${mobileNavOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {mobileNavOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-3 overflow-hidden shadow-lg z-20"
            >
              <nav className="grid grid-cols-2 gap-1.5">
                {filteredNav.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                        isActive
                          ? "border-blue-500/30 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-200"
                          : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <ThemeToggle />
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-500 dark:text-rose-400"
                >
                  <LogoutIcon className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7 overflow-x-hidden">
          <div className="mx-auto max-w-6xl space-y-6 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
