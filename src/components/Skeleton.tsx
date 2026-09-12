export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-6 shadow-soft">
      <div className="mb-4 h-48 rounded-lg bg-mist" />
      <div className="mb-2 h-4 w-3/4 rounded bg-mist" />
      <div className="mb-4 h-3 w-1/2 rounded bg-mist" />
      <div className="space-y-2">
        <div className="h-3 rounded bg-mist" />
        <div className="h-3 w-5/6 rounded bg-mist" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-lg bg-white p-4 shadow-soft">
          <div className="mb-2 h-4 w-3/4 rounded bg-mist" />
          <div className="h-3 w-1/2 rounded bg-mist" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded bg-mist"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar() {
  return (
    <div className="animate-pulse flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-mist" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 rounded bg-mist" />
        <div className="h-3 w-1/4 rounded bg-mist" />
      </div>
    </div>
  );
}
