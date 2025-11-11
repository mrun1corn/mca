import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { APP_NAME } from "./lib/config";
import { ToastProvider } from "./components/Toast";
const LoadingScreen = () => (
  <div className="p-4">
    <div className="animate-pulse space-y-3 max-w-2xl">
      <div className="h-6 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="h-10 rounded-2xl bg-slate-200 dark:bg-slate-800" />
    </div>
  </div>
);
import { api } from "./lib/api";
import { useQuery } from "@tanstack/react-query";
import ThemeToggle from "./components/ThemeToggle";
import AppShell from "./components/layout/AppShell";

const Home = lazy(() => import("./pages/Home"));
const People = lazy(() => import("./pages/People"));
const DepositPage = lazy(() => import("./pages/Deposit"));
const WithdrawPage = lazy(() => import("./pages/Withdraw"));
const Export = lazy(() => import("./pages/Export"));
const Setup = lazy(() => import("./pages/Setup"));
const Login = lazy(() => import("./pages/Login"));
const YearlyCollection = lazy(() => import("./pages/YearlyCollection"));
const Balances = lazy(() => import("./pages/Balances"));

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isLoading, isError } = useQuery({
    queryKey: ["auth-check"],
    queryFn: async () => {
      await api.get("/home");
      return true;
    },
    staleTime: 60_000,
    gcTime: 60_000,
  });
  if (isLoading) return <LoadingScreen />;
  if (isError) return <Navigate to="/login" replace />;
  return children;
}

function RequireRole({ roles, children }: { roles: Array<"admin" | "accountant">; children: JSX.Element }) {
  const { data, isLoading } = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get("/me")).data });
  if (isLoading) return <LoadingScreen />;
  const role = data?.role as "admin" | "accountant" | "user" | undefined;
  const gateRole = role === "admin" || role === "accountant" ? role : undefined;
  if (!gateRole || !roles.includes(gateRole)) return <Navigate to="/" replace />;
  return children;
}

function ProtectedLayout() {
  return (
    <RequireAuth>
      <AppShell>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </AppShell>
    </RequireAuth>
  );
}

export default function App() {
  useEffect(() => {
    document.title = APP_NAME;
    try {
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
      const theme = saved === "dark" || (!saved && prefersDark) ? "dark" : "light";
      document.documentElement.classList.toggle("dark", theme === "dark");
    } catch {
      // ignore
    }
  }, []);

  const loginScreen = (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="flex justify-end px-4 pt-4">
        <ThemeToggle />
      </div>
      <div className="px-4 pb-10">
        <Suspense fallback={<LoadingScreen />}>
          <Login />
        </Suspense>
      </div>
    </div>
  );

  return (
    <ToastProvider>
      <Routes>
        <Route path="/login" element={loginScreen} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/people"
            element={
              <RequireRole roles={["admin"]}>
                <People />
              </RequireRole>
            }
          />
          <Route
            path="/deposit"
            element={
              <RequireRole roles={["admin", "accountant"]}>
                <DepositPage />
              </RequireRole>
            }
          />
          <Route
            path="/withdraw"
            element={
              <RequireRole roles={["admin", "accountant"]}>
                <WithdrawPage />
              </RequireRole>
            }
          />
          <Route
            path="/export"
            element={
              <RequireRole roles={["admin", "accountant"]}>
                <Export />
              </RequireRole>
            }
          />
          <Route
            path="/yearly"
            element={
              <RequireRole roles={["admin", "accountant"]}>
                <YearlyCollection />
              </RequireRole>
            }
          />
          <Route
            path="/balances"
            element={
              <RequireRole roles={["admin", "accountant"]}>
                <Balances />
              </RequireRole>
            }
          />
          <Route path="/setup" element={<Setup />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}
