import React, { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  const baseClasses = "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50";
  const interactiveClasses = onClick ? "cursor-pointer transition hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700" : "";
  
  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${interactiveClasses} p-4 ${className}`}
    >
      {children}
    </div>
  );
}
