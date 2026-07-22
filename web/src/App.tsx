import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Suspense, lazy, useEffect, useState, createContext, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { APP_NAME } from "./lib/config";
import { ToastProvider } from "./components/Toast";
import { api } from "./lib/api";
import ThemeToggle from "./components/ThemeToggle";
import AppShell from "./components/layout/AppShell";
import Login from "./pages/Login";

// Auth context to manage auth state globally
type AuthUser = { id: string; name: string; role: string } | null;
const AuthContext = createContext<{
  user: AuthUser;
  setUser: (user: AuthUser) => void;
  isAuthChecking: boolean;
}>({ user: null, setUser: () => {}, isAuthChecking: true });

export function useAuth() {
  return useContext(AuthContext);
}

export const FullScreenLoader = () => (
  <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
    <div className="flex flex-col items-center space-y-6 animate-fade-in">
      <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-blue-500 animate-spin" />
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Community Savings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest">Preparing Workspace</p>
      </div>
    </div>
  </div>
);

import { SkeletonCard, SkeletonList } from "./components/Skeleton";

export const PageLoader = () => (
  <div className="space-y-6 animate-fade-in p-2">
    <SkeletonCard lines={2} />
    <SkeletonList rows={3} columns={1} />
  </div>
);

const Home = lazy(() => import("./pages/Home"));
const People = lazy(() => import("./pages/People"));
const DepositPage = lazy(() => import("./pages/Deposit"));
const WithdrawPage = lazy(() => import("./pages/Withdraw"));
const Export = lazy(() => import("./pages/Export"));
const Setup = lazy(() => import("./pages/Setup"));
const YearlyCollection = lazy(() => import("./pages/YearlyCollection"));
const Balances = lazy(() => import("./pages/Balances"));

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, isAuthChecking } = useAuth();
  
  // While checking auth, show loading (but user already on login page)
  if (isAuthChecking) {
    return <FullScreenLoader />;
  }
  
  // Not authenticated - redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function RequireRole({ roles, children }: { roles: Array<"admin" | "accountant">; children: JSX.Element }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const role = user.role as "admin" | "accountant" | "user" | undefined;
  const gateRole = role === "admin" || role === "accountant" ? role : undefined;
  
  if (!gateRole || !roles.includes(gateRole)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function ProtectedLayout() {
  return (
    <RequireAuth>
      <AppShell>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </AppShell>
    </RequireAuth>
  );
}

export default function App() {
  const [user, setUser] = useState<AuthUser>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(() => {
    return localStorage.getItem("hasSession") === "true";
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) {
      queryClient.clear();
    }
  }, [user, queryClient]);

  useEffect(() => {
    // Check auth on mount
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/auth-check");
        if (res.data?.ok && res.data?.user) {
          setUser(res.data.user);
        }
      } catch {
        // Not authenticated - that's fine
      } finally {
        setIsAuthChecking(false);
      }
    };
    
    checkAuth();
    
    // Also listen for storage changes (for multi-tab)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "logout") {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

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

  const loginScreen = user ? <Navigate to="/" replace /> : (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="flex justify-end px-4 pt-4">
        <ThemeToggle />
      </div>
      <div className="px-4 pb-10">
        <Login />
      </div>
    </div>
  );


  return (
    <ToastProvider>
      <AuthContext.Provider value={{ user, setUser, isAuthChecking }}>
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
      </AuthContext.Provider>
    </ToastProvider>
  );
}
