import { memo } from "react";
import Button from "./Button";
import { formatBDT } from "../lib/api";

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
            <div className="text-base font-semibold text-gray-800 dark:text-gray-100">{user.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{user.email || "No email on file"}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">Role: {user.role}</div>
          </div>
          <div className="text-sm text-right space-y-1">
            <div className="text-xs text-gray-500 dark:text-gray-400">Balance</div>
            <div className="font-semibold text-emerald-600 dark:text-emerald-300">{formatBDT(user.balance || 0)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Last month {formatBDT(user.lastMonth || 0)}</div>
          </div>
        </div>
        <div className="flex gap-1.5 justify-end">
          <Button variant="ghost" size="sm" onClick={onEdit}>Edit</Button>
          <Button variant="danger" size="sm" onClick={onDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
}


export default memo(UserCard);
