export function FiltersSkeleton() {
  return (
    <div
      className="animate-pulse space-y-6"
      role="status"
      aria-label="Loading filters"
      aria-live="polite"
    >
      {/* Stops filter skeleton */}
      <div
        className="h-20 rounded-xl bg-surface-muted"
        aria-hidden="true"
      />

      {/* Price filter skeleton */}
      <div
        className="h-32 rounded-xl bg-surface-muted"
        aria-hidden="true"
      />

      {/* Airlines filter skeleton */}
      <div
        className="h-48 rounded-xl bg-surface-muted"
        aria-hidden="true"
      />
    </div>
  )
}
//       </fieldset>
