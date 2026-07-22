import { memo } from "react";
import { formatAmount } from "../lib/api";
import { avatarColor, initials } from "../lib/ui";

function MemberCard({ card, onClick }: { card: any; onClick?: () => void }) {
  const hasRecent = !!card.recent?.[0]?.date;
  const lastDate = hasRecent ? new Date(card.recent[0].date).toLocaleDateString("en-BD") : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-500/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 relative overflow-hidden"
    >
      <div className="flex items-start gap-3.5 relative z-10">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-sm ${avatarColor(card.name)} transition-transform group-hover:scale-105`}>
          {initials(card.name)}
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-base font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {card.name}
            </span>
            {lastDate ? (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {lastDate}
              </span>
            ) : null}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Last month: <span className="font-medium text-slate-700 dark:text-slate-300">{formatAmount(card.lastMonth)}</span></span>
          </div>

          <div className="pt-1.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Balance</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {formatAmount(card.balance)}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default memo(MemberCard);
