'use client'

import { useEffect } from 'react'
import { Flight } from '@/types/flight'
import { formatDateTime, formatDuration } from '@/lib/formatters'

type FlightDetailsModalProps = {
  flight: Flight | null
  onClose: () => void
}

export function FlightDetailsModal({
  flight,
  onClose,
}: FlightDetailsModalProps) {
  if (!flight) return null

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const stopsLabel =
    flight.stops === 0
      ? 'Non-stop'
      : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-xl bg-surface p-6 shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-text-muted hover:text-text"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-text">
            Flight details
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Operated by {flight.airline}
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-6 rounded-lg bg-background p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {formatDateTime(flight.departureTime, {
                withWeekday: true,
              })}
            </span>

            <span className="mx-2 text-text-muted">→</span>

            <span className="font-medium">
              {formatDateTime(flight.arrivalTime, {
                withWeekday: true,
              })}
            </span>
          </div>

          <div className="mt-3 flex gap-3 text-xs">
            <span className="rounded-full bg-surface px-3 py-1 text-text-muted">
              {stopsLabel}
            </span>
            <span className="rounded-full bg-surface px-3 py-1 text-text-muted">
              {formatDuration(flight.duration)}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs text-text-muted">
              Price per passenger
            </p>
            <p className="text-2xl font-semibold text-text">
              ${flight.price.toFixed(0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
