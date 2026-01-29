import { Flight } from '@/types/flight'
import { FlightCard } from './FlightCard'
import { FlightCardSkeleton } from './FlightCardSkeleton'

type FlightListProps = {
  flights: Flight[]
  isLoading?: boolean
}

export function FlightList({
  flights,
  isLoading = false,
}: FlightListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <FlightCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (flights.length === 0) {
    return (
      <p className="rounded-xl bg-surface p-4 text-sm text-text-muted">
        No flights match the selected filters.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {flights.map((flight) => (
        <FlightCard
          key={flight.id}
          flight={flight}
        />
      ))}
    </div>
  )
}
