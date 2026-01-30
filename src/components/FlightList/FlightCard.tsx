import { Flight } from '@/types/flight'
import {
  formatDateTime,
  formatDuration,
} from '@/lib/formatters'

type FlightCardProps = {
  flight: Flight
  onSelect?: (flight: Flight) => void
}

export function FlightCard({
  flight,
  onSelect,
}: FlightCardProps) {
  const stopsLabel =
    flight.stops === 0
      ? 'Non-stop'
      : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`

  function handleClick() {
    onSelect?.(flight)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
      className="
        cursor-pointer
        flex flex-col gap-4 rounded-xl bg-surface p-4
        transition
        hover:bg-surface-muted
        focus:outline-none focus:ring-2 focus:ring-primary
        md:flex-row md:items-center md:justify-between
      "
    >
      {/* Airline + times */}
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-text">
          {flight.airline}
        </p>

        <p className="mt-0.5 text-xs text-text-muted">
          {formatDateTime(flight.departureTime, {
            withWeekday: true,
          })}{' '}
          → {formatDateTime(flight.arrivalTime)}
        </p>
      </div>

      {/* Meta */}
      <div className="flex gap-4 text-xs text-text-muted">
        <span className="rounded-full bg-background px-3 py-1">
          {stopsLabel}
        </span>

        <span className="rounded-full bg-background px-3 py-1">
          {formatDuration(flight.duration)}
        </span>
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="text-lg font-semibold text-text">
          ${flight.price.toFixed(0)}
        </p>

        <p className="text-xs text-text-muted">
          per passenger
        </p>
      </div>
    </div>
  )
}
