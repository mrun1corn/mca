import { memo } from "react";

export type ModeCardProps = {
  title: string;
  body: string;
  active: boolean;
  onClick: () => void;
  variant?: "blue" | "rose";
};

function ModeCard({ title, body, active, onClick, variant = "blue" }: ModeCardProps) {
  const activeStyles =
    variant === "rose"
      ? "border-rose-500 bg-rose-50/80 text-rose-700 dark:border-rose-400/60 dark:bg-rose-500/15 dark:text-rose-100 shadow-sm"
      : "border-blue-500 bg-blue-50/80 text-blue-700 dark:border-blue-400/60 dark:bg-blue-500/15 dark:text-blue-100 shadow-sm";

  const hoverStyles =
    variant === "rose"
      ? "hover:border-rose-300 hover:bg-rose-50/40 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
      : "hover:border-blue-300 hover:bg-blue-50/40 dark:hover:border-slate-700 dark:hover:bg-slate-800/50";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-2xl border p-4 transition-all duration-150 ${
        active ? activeStyles : `border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 ${hoverStyles}`
      }`}
    >
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs mt-1 text-slate-500 dark:text-slate-400">{body}</div>
    </button>
  );
}

export default memo(ModeCard);
