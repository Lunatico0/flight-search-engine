export function FlightCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4 rounded-xl bg-surface p-4 md:flex-row md:items-center md:justify-between">
      {/* Airline + times */}
      <div className="min-w-0 space-y-2">
        <div className="h-4 w-32 rounded bg-surface-muted" />
        <div className="h-3 w-40 rounded bg-surface-muted" />
      </div>

      {/* Meta */}
      <div className="flex gap-4">
        <div className="h-3 w-16 rounded bg-surface-muted" />
        <div className="h-3 w-20 rounded bg-surface-muted" />
      </div>

      {/* Price */}
      <div className="h-5 w-16 rounded bg-surface-muted" />
    </div>
  )
}
