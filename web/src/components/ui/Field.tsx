import React, { ReactNode } from "react";

interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ label, hint, error, children, className = "" }: FieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between gap-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
          {hint && <span className="text-xs text-slate-400 dark:text-slate-500">{hint}</span>}
        </div>
      )}
      {children}
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}
