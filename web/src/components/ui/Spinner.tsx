export default function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-300" role="status" aria-live="polite" aria-busy="true">
      <span className="inline-block h-4 w-4 animate-spin-slow rounded-full border-2 border-blue-500 border-t-transparent" />
      {label ? <span>{label}</span> : <span className="sr-only">Loading</span>}
    </div>
  );
}
