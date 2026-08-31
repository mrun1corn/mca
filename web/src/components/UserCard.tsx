import { memo } from "react";
import Button from "./Button";
import { formatAmount } from "../lib/api";

type Props = {
  user: any;
  onEdit: () => void;
  onDelete: () => void;
};

function UserCard({ user, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-xl border border-blue-100/70 dark:border-slate-700 bg-gradient-to-br from-white via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 shadow-md hover:shadow-xl transition-shadow">
      <div className="p-3 sm:p-3.5 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-gray-800 dark:text-gray-100">{user.name}</span>
              {user.username && (
                <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                  @{user.username}
                </span>
              )}
              {user.memberCode && (
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {user.memberCode}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {user.email || "No email on file"} {user.phone ? `· ${user.phone}` : ""}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">Role: {user.role}</div>
          </div>
          <div className="text-sm text-right space-y-1">
            <div className="text-xs text-gray-500 dark:text-gray-400">Balance</div>
            <div className="font-semibold text-emerald-600 dark:text-emerald-300">{formatAmount(user.balance || 0)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Last month {formatAmount(user.lastMonth || 0)}</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button variant="ghost" size="full" className="sm:w-auto" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" size="full" className="sm:w-auto" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}


export default memo(UserCard);
