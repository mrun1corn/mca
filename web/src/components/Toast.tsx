import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = { id: number; message: string; type?: "success" | "error" | "info" };
type Ctx = { notify: (msg: string, type?: Toast["type"]) => void };
const ToastCtx = createContext<Ctx | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const notify = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Date.now() + Math.random();
    setToasts((arr) => [...arr, { id, message, type }]);
    setTimeout(() => setToasts((arr) => arr.filter((t) => t.id !== id)), 2500);
  }, []);
  const value = useMemo(() => ({ notify }), [notify]);
  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="fixed bottom-3 right-3 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-3 py-2 rounded shadow text-sm animate-fade-in ${
              t.type === 'success' ? 'bg-emerald-600 text-white' : t.type === 'error' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

