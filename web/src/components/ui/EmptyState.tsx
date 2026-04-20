import React, { ReactNode } from "react";

export interface EmptyStateProps {
  title?: string;
  message: string;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({ title, message, icon, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-10 px-4 text-center ${className}`}>
      {icon && <div className="text-slate-300 dark:text-slate-600 mb-3">{icon}</div>}
      {title && <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{title}</h3>}
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">{message}</p>
    </div>
  );
}
