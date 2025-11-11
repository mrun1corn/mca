import { ReactNode, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { APP_NAME } from "../../lib/config";
import ThemeToggle from "../ThemeToggle";
import {
  HomeIcon,
  UsersIcon,
  DepositIcon,
  WithdrawIcon,
  ExportIcon,
  CogIcon,
  LogoutIcon,
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
  { label: "Setup", description: "Preferences and account", to: "/setup", icon: CogIcon },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: me } = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get("/me")).data });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const role = (me?.role ?? "user") as Role;
  const filteredNav = navItems.filter((item) => !item.roles || item.roles.includes(role));

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex">
      <aside className="hidden lg:flex w-72 flex-col border-r border-slate-100/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
        <div className="px-6 pt-8 pb-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Community savings</div>
          <div className="text-xl font-semibold mt-1 text-slate-900 dark:text-white">{APP_NAME}</div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Track group money in plain language. Everything important sits one click away.
          </p>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {filteredNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex flex-col rounded-xl px-4 py-3 border transition-all",
                  isActive
                    ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-100 shadow-sm"
                    : "border-transparent hover:border-blue-100 hover:bg-blue-50/60 dark:hover:border-slate-700 dark:hover:bg-slate-800/50",
                ].join(" ")
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.description}</p>
            </NavLink>
          ))}
        </nav>
        <div className="px-4 pb-6 space-y-3">
          <div className="rounded-2xl border border-slate-100 dark:border-slate-700 p-4 bg-white/70 dark:bg-slate-900/60">
            <p className="text-xs uppercase tracking-wider text-slate-400">Signed in as</p>
            <p className="text-sm font-semibold mt-1 text-slate-900 dark:text-white">{me?.name || "Member"}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{role === "admin" ? "Admin" : role === "accountant" ? "Accountant" : "Member"}</p>
            <button
              onClick={logout}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400"
            >
              <LogoutIcon className="w-4 h-4" />
              Sign out
            </button>
          </div>
          <ThemeToggle />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="lg:hidden border-b border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur px-4 py-2 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Today</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{APP_NAME}</p>
            </div>
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 p-2 text-slate-600 dark:text-slate-200"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-expanded={mobileNavOpen}
              aria-label="Toggle navigation menu"
            >
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${mobileNavOpen ? "translate-y-1 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${mobileNavOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${mobileNavOpen ? "-translate-y-1 -rotate-45" : ""}`} />
            </button>
          </div>
          <div
            className={`${
              mobileNavOpen ? "flex" : "hidden"
            } flex-col gap-3 w-full sm:px-1 sm:-mx-1 lg:mx-0`}
          >
            <div className="flex flex-col gap-2 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 p-3 bg-white/80 dark:bg-slate-900/70">
              <ThemeToggle />
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400"
              >
                <LogoutIcon className="w-4 h-4" />
                Logout
              </button>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:flex-nowrap sm:overflow-x-auto sm:pb-1">
            {filteredNav.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm border w-full justify-center sm:w-auto sm:justify-start ${
                    isActive
                      ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-100"
                      : "border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              );
            })}
            </div>
          </div>
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-6xl">{children}</div>
          <footer className="max-w-6xl mx-auto text-xs text-slate-400 dark:text-slate-500 mt-8 text-center">
            Built for community groups that prefer clarity over corporate-speak.
          </footer>
        </main>
      </div>
    </div>
  );
}
