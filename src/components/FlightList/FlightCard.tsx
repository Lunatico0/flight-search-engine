import { Flight } from '@/types/flight'

type FlightCardProps = {
  flight: Flight
}

export function FlightCard({ flight }: FlightCardProps) {
  const stopsLabel =
    flight.stops === 0
      ? 'Non-stop'
      : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-surface p-4 transition hover:bg-surface-muted md:flex-row md:items-center md:justify-between">
      {/* Airline + times */}
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-text">
          {flight.airline}
        </p>

        <p className="mt-0.5 text-xs text-text-muted">
          {flight.departureTime} → {flight.arrivalTime}
        </p>
      </div>

      {/* Meta */}
      <div className="flex gap-4 text-xs text-text-muted">
        <span className="rounded-full bg-background px-3 py-1">
          {stopsLabel}
        </span>

        <span className="rounded-full bg-background px-3 py-1">
          {flight.duration}
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
