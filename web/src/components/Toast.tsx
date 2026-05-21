import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Toast = { id: number; message: string; type?: "success" | "error" | "info" };
type Ctx = { notify: (msg: string, type?: Toast["type"]) => void };
const ToastCtx = createContext<Ctx | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const CheckIcon = () => (
  <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const ErrorIcon = () => (
  <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
);
const InfoIcon = () => (
  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const notify = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Date.now() + Math.random();
    setToasts((arr) => [...arr, { id, message, type }]);
    setTimeout(() => setToasts((arr) => arr.filter((t) => t.id !== id)), 3000);
  }, []);
  const value = useMemo(() => ({ notify }), [notify]);
  
  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border pointer-events-auto backdrop-blur-xl ${
                t.type === 'success' ? 'bg-emerald-50/90 border-emerald-200/60 dark:bg-emerald-950/80 dark:border-emerald-800/60' : 
                t.type === 'error' ? 'bg-rose-50/90 border-rose-200/60 dark:bg-rose-950/80 dark:border-rose-800/60' : 
                'bg-white/90 border-slate-200/60 dark:bg-slate-900/90 dark:border-slate-800/60'
              }`}
            >
              <div className="shrink-0">
                {t.type === 'success' ? <CheckIcon /> : t.type === 'error' ? <ErrorIcon /> : <InfoIcon />}
              </div>
              <div className="font-semibold text-sm text-slate-800 dark:text-slate-100 pr-2">
                {t.message}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
