const basePulse = "animate-pulse bg-slate-200/80 dark:bg-slate-700/40";

export function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`h-3 rounded-full ${basePulse} ${className}`} />;
}

export function SkeletonCircle({ size = 40, className = "" }: { size?: number; className?: string }) {
  return <div className={`rounded-full ${basePulse} ${className}`} style={{ width: size, height: size }} />;
}

export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <SkeletonCircle size={40} />
        <div className="flex-1 space-y-2">
          <SkeletonLine className="h-4 w-1/2" />
          <SkeletonLine className="w-1/3" />
        </div>
      </div>
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, idx) => (
          <SkeletonLine key={idx} className="w-full" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonList({ rows = 4, columns = 1 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {Array.from({ length: columns }).map((__, col) => (
            <SkeletonLine key={col} className="h-4" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 4, columns = 3 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="grid items-center gap-3" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {Array.from({ length: columns }).map((__, colIdx) => (
            <SkeletonLine key={colIdx} className="h-4" />
          ))}
        </div>
      ))}
    </div>
  );
}
