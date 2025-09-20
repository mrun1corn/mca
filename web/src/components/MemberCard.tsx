import { memo } from "react";
import { formatBDT } from "../lib/api";
import { avatarColor, initials } from "../lib/ui";

function MemberCard({ card, onClick }: { card: any; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-xl border border-blue-100/70 dark:border-slate-700 bg-gradient-to-br from-white via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="p-4 flex items-start gap-3">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold ${avatarColor(card.name)}`}>
          {initials(card.name)}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-gray-800 dark:text-gray-100">{card.name}</span>
            {card.recent?.[0]?.date ? (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(card.recent[0].date).toLocaleDateString("en-BD")}
              </span>
            ) : null}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Last month: {formatBDT(card.lastMonth)}</div>
          <div className="text-sm text-gray-700 dark:text-gray-200">
            Balance <span className="font-semibold text-emerald-600 dark:text-emerald-300">{formatBDT(card.balance)}</span>
          </div>
        </div>
      </div>
    </button>
  );
}


export default memo(MemberCard);
