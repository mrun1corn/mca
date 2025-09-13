import { formatBDT } from "../lib/api";
import { avatarColor, initials } from "../lib/ui";

export default function MemberCard({ card, onClick }: { card: any; onClick?: () => void }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 shadow rounded cursor-pointer transition-transform duration-150 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] animate-scale-in"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${avatarColor(card.name)}`}>
          {initials(card.name)}
        </div>
        <div>
          <div className="font-medium leading-tight">{card.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-300">Last Month: {formatBDT(card.lastMonthPoisha)}</div>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">Balance: <span className="font-medium">{formatBDT(card.balancePoisha)}</span></div>
    </div>
  );
}
