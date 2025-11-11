import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, formatBDT } from "../lib/api";
import PageHeader from "../components/layout/PageHeader";
import Panel from "../components/ui/Panel";
import { useSearchParams } from "react-router-dom";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type YearlyCollection = {
  year: number;
  total: number;
  monthlyTotals: number[];
  users: Array<{
    userId: string;
    name: string;
    monthly: number[];
    total: number;
  }>;
};

export default function YearlyCollectionPage() {
  const STALE_TIME = 30_000;
  const currentYear = new Date().getFullYear();
  const yearOptions = useMemo(() => [currentYear, currentYear - 1], [currentYear]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialYearParam = Number(searchParams.get("year"));
  const initialYear = Number.isFinite(initialYearParam) ? initialYearParam : currentYear;
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [yearTotals, setYearTotals] = useState<Record<number, number>>({});
  const [drawerUser, setDrawerUser] = useState<YearlyCollection["users"][number] | null>(null);

  useEffect(() => {
    const param = Number(searchParams.get("year"));
    if (Number.isFinite(param) && param !== selectedYear) {
      setSelectedYear(param);
    }
  }, [searchParams, selectedYear]);

  useEffect(() => {
    setDrawerUser(null);
  }, [selectedYear]);

  const handleSelectYear = (year: number) => {
    setDrawerUser(null);
    setSelectedYear(year);
    setSearchParams({ year: String(year) }, { replace: true });
  };

  const yearlyCollection = useQuery<YearlyCollection>({
    queryKey: ["yearly-collection", selectedYear],
    queryFn: async () => (await api.get("/reports/yearly-collection", { params: { year: selectedYear } })).data,
    enabled: !!selectedYear,
    staleTime: STALE_TIME,
    gcTime: STALE_TIME * 4,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (yearlyCollection.data) {
      setYearTotals((prev) => ({ ...prev, [selectedYear]: yearlyCollection.data!.total }));
    }
  }, [selectedYear, yearlyCollection.data]);

  const totalForSelected = yearTotals[selectedYear] ?? yearlyCollection.data?.total;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Yearly collection"
        title="See how much the circle collected each year"
        description="Pick a year to break down deposits per member. Tap a card to open their month-by-month history."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {yearOptions.map((year) => {
          const isSelected = year === selectedYear;
          const total = yearTotals[year];
          return (
            <button
              key={year}
              type="button"
              onClick={() => handleSelectYear(year)}
              className={`text-left rounded-2xl border p-4 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400/40 ${
                isSelected
                  ? "border-blue-300 bg-blue-50 dark:border-blue-500/50 dark:bg-blue-500/10"
                  : "border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 hover:shadow-md"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Collection year</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">{year}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {typeof total === "number" ? formatBDT(total) : isSelected ? "Loading…" : "Tap to load"}
              </p>
            </button>
          );
        })}
      </div>

      <Panel
        title={`${selectedYear} deposits`}
        description="Shows each member’s deposits for the selected year."
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total collected: {typeof totalForSelected === "number" ? formatBDT(totalForSelected) : "—"}
          </p>
          {drawerUser ? (
            <button
              type="button"
              className="self-start sm:self-auto inline-flex items-center gap-1 text-sm text-slate-500 hover:text-rose-500"
              onClick={() => setDrawerUser(null)}
            >
              Close details
            </button>
          ) : null}
        </div>
        {yearlyCollection.isLoading ? (
          <div className="text-sm text-slate-500">Loading yearly collection…</div>
        ) : yearlyCollection.isError ? (
          <div className="text-sm text-rose-500">Could not load yearly collection data.</div>
        ) : yearlyCollection.data && yearlyCollection.data.users.length ? (
          <YearlyCollectionCards data={yearlyCollection.data} onSelect={setDrawerUser} />
        ) : (
          <div className="text-sm text-slate-500">No deposits recorded for this year yet.</div>
        )}
      </Panel>

      {drawerUser ? (
        <YearlyCollectionDrawer year={selectedYear} user={drawerUser} onClose={() => setDrawerUser(null)} />
      ) : null}
    </div>
  );
}

function YearlyCollectionCards({
  data,
  onSelect,
}: {
  data: YearlyCollection;
  onSelect: (user: YearlyCollection["users"][number]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data.users.map((user) => {
          const lastMonthAmount = user.monthly[new Date().getMonth()] || 0;
          return (
            <div
              key={user.userId}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 shadow-sm transition hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => onSelect(user)}
                className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-blue-400/40 rounded-2xl"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Member</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">{user.name}</p>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div>
                    <p className="text-xs uppercase">This year</p>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">{formatBDT(user.total)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase">This month</p>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">
                      {lastMonthAmount ? formatBDT(lastMonthAmount) : "—"}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Monthly totals</p>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          {MONTH_LABELS.map((label, idx) => (
            <div key={`monthly-total-${label}`}>
              <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
              <p className="font-semibold text-slate-900 dark:text-white">
                {data.monthlyTotals[idx] ? formatBDT(data.monthlyTotals[idx]) : "—"}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right text-base font-bold text-slate-900 dark:text-white">Year total: {formatBDT(data.total)}</div>
      </div>
    </div>
  );
}

function YearlyCollectionDrawer({
  year,
  user,
  onClose,
}: {
  year: number;
  user: YearlyCollection["users"][number];
  onClose: () => void;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const close = () => {
    setShow(false);
    setTimeout(onClose, 180);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center" onClick={close}>
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${show ? "opacity-100" : "opacity-0"}`} />
      <div
        className={`relative w-[calc(100%-1rem)] sm:max-w-xl max-h-[90vh] glass rounded-3xl p-5 shadow-xl overflow-y-auto transition-all duration-200 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Yearly collection</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              {user.name} · {year}
            </h2>
          </div>
          <button className="text-sm text-slate-500 hover:text-rose-500" onClick={close}>
            Close
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Year total</p>
            <p className="text-xl font-semibold text-slate-900 dark:text-white">{formatBDT(user.total)}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Current month</p>
            <p className="text-xl font-semibold text-slate-900 dark:text-white">
              {user.monthly[new Date().getMonth()] ? formatBDT(user.monthly[new Date().getMonth()]) : "—"}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Monthly history</p>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {MONTH_LABELS.map((label, idx) => (
              <div key={`${user.userId}-drawer-${label}`} className="rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-white/80 dark:bg-slate-900/60">
                <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                <p className="text-base font-semibold text-slate-900 dark:text-white">
                  {user.monthly[idx] ? formatBDT(user.monthly[idx]) : "—"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
