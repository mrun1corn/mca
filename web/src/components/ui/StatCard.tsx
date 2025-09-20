import { memo, ReactNode } from "react";

type Props = {
  label: ReactNode;
  value: ReactNode;
  icon?: ReactNode;
  variant?: "default" | "success" | "danger" | "info";
  helper?: ReactNode;
};

const palette: Record<NonNullable<Props["variant"]>, { wrapper: string; iconWrap: string; icon: string; accent: string }> = {
  default: {
    wrapper: "bg-gradient-to-br from-white via-white to-blue-50 border border-blue-100 shadow-[0_12px_30px_-20px_rgba(59,130,246,0.6)] dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:border-slate-700",
    iconWrap: "bg-blue-100/80 dark:bg-blue-500/20",
    icon: "text-blue-600 dark:text-blue-300",
    accent: "text-blue-600 dark:text-blue-300",
  },
  success: {
    wrapper: "bg-gradient-to-br from-white via-white to-emerald-50 border border-emerald-200 shadow-[0_12px_30px_-20px_rgba(16,185,129,0.6)] dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:border-emerald-700/60",
    iconWrap: "bg-emerald-100/80 dark:bg-emerald-500/20",
    icon: "text-emerald-600 dark:text-emerald-300",
    accent: "text-emerald-600 dark:text-emerald-300",
  },
  danger: {
    wrapper: "bg-gradient-to-br from-white via-white to-rose-50 border border-rose-200 shadow-[0_12px_30px_-20px_rgba(239,68,68,0.6)] dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:border-rose-700/60",
    iconWrap: "bg-rose-100/80 dark:bg-rose-500/20",
    icon: "text-rose-600 dark:text-rose-300",
    accent: "text-rose-600 dark:text-rose-300",
  },
  info: {
    wrapper: "bg-gradient-to-br from-white via-white to-indigo-50 border border-indigo-200 shadow-[0_12px_30px_-20px_rgba(99,102,241,0.6)] dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:border-indigo-700/60",
    iconWrap: "bg-indigo-100/80 dark:bg-indigo-500/20",
    icon: "text-indigo-600 dark:text-indigo-300",
    accent: "text-indigo-600 dark:text-indigo-300",
  },
};

function StatCard({ label, value, icon, helper, variant = "default" }: Props) {
  const styles = palette[variant];
  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl ${styles.wrapper}`}>
      <div className="flex items-start gap-4">
        {icon ? (
          <div className={`rounded-full p-2 shadow-inner ${styles.iconWrap}`}>
            <div className={`text-lg ${styles.icon}`}>{icon}</div>
          </div>
        ) : null}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
          {helper ? <p className="text-xs text-gray-500 dark:text-gray-400">{helper}</p> : null}
        </div>
      </div>
      <div className={`absolute -bottom-8 -right-8 h-24 w-24 rounded-full blur-2xl opacity-70 ${styles.iconWrap}`} aria-hidden="true" />
    </div>
  );
}

export default memo(StatCard);
