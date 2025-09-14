import { useQuery } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import MemberCard from "../components/MemberCard";
import MemberDrawer from "../components/MemberDrawer";
import { useState } from "react";
import { SkeletonCard } from "../components/Skeleton";
import { HomeIcon, MoneyIcon, UsersIcon } from "../components/Icon";

export default function Home() {
  const { data, isLoading } = useQuery({ queryKey: ["home"], queryFn: async () => (await api.get("/home")).data });
  const [drawerUserId, setDrawerUserId] = useState<string | null>(null);
  if (!data && isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (<SkeletonCard key={i} />))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 p-4 shadow rounded animate-fade-in">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><UsersIcon/> Members</div>
          <div className="text-2xl font-medium">{data.membersCount}</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-gray-800 p-4 shadow rounded animate-fade-in">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><MoneyIcon/> Total Balance</div>
          <div className="text-2xl font-medium">{formatBDT(data.groupBalance)}</div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800 p-4 shadow rounded animate-fade-in">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><HomeIcon/> Open Dues</div>
          <div className="text-2xl font-medium">{data.arrearsCount}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded animate-fade-in">
          <div className="text-gray-600 dark:text-gray-300">Remaining Balance</div>
          <div className="text-2xl font-medium">{formatBDT(data.remainingBalance)}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.cards.map((c: any) => (
          <MemberCard key={c.userId} card={c} onClick={() => setDrawerUserId(c.userId)} />
        ))}
      </div>
      {drawerUserId && <MemberDrawer userId={drawerUserId} onClose={() => setDrawerUserId(null)} />}
    </div>
  );
}
