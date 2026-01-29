export function PriceChartSkeleton() {
  return (
    <div className="animate-pulse rounded-xl bg-surface p-4">
      {/* Title */}
      <div className="mb-4 h-4 w-48 rounded bg-surface-muted" />

      {/* Chart placeholder */}
      <div className="flex h-72 items-end gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="w-full rounded bg-surface-muted"
            style={{
              height: `${40 + index * 12}px`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
