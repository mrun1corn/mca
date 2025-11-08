import WithdrawForm from "../components/WithdrawForm";
import PageHeader from "../components/layout/PageHeader";

const helperList = [
  "We automatically split the deduction evenly between eligible members.",
  "If you exclude someone, their share is re-distributed across the rest.",
  "Investments use the same flow—you’re just sending money outside the group rather than to a person.",
];

export default function WithdrawPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Withdraw / Invest"
        title="Move money out with full transparency"
        description="Whether it’s a cash-out for a member or money we’re investing elsewhere, spell out the amount, repayment plan, and who shares the cost."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_1fr]">
        <section className="glass rounded-3xl p-6 shadow-lg">
          <WithdrawForm />
        </section>
        <aside className="space-y-4">
          <div className="glass rounded-3xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Plain-language guide</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {helperList.map((note) => (
                <li key={note} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-100 dark:border-slate-800 p-5 bg-white/80 dark:bg-slate-900/70 text-sm text-slate-600 dark:text-slate-300">
            <p className="font-medium text-slate-900 dark:text-white">Need to park money in an investment fund?</p>
            <p className="mt-2">
              Choose the “Invest externally” mode in the form. We’ll still show who contributed the principal and how much interest we expect back.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
