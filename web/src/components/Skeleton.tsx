export function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`h-3 bg-gray-200/80 rounded animate-pulse ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white p-4 shadow rounded animate-fade-in">
      <SkeletonLine className="h-4 w-2/3 mb-3" />
      <SkeletonLine className="w-1/2 mb-2" />
      <SkeletonLine className="w-1/3" />
    </div>
  );
}

