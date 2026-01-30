'use client'

import { useEffect } from 'react'
import { Flight } from '@/types/flight'
import { formatDateTime, formatDuration } from '../../lib/formatters'

type FlightDetailsModalProps = {
  flight: Flight | null
  onClose: () => void
}

export function FlightDetailsModal({
  flight,
  onClose,
}: FlightDetailsModalProps) {
  if (!flight) return null

  // Close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay click */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-xl bg-surface p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-text-muted hover:text-text"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="mb-4 text-lg font-semibold">
          Flight details
        </h2>

        {/* Airline */}
        <div className="mb-3">
          <p className="text-sm text-text-muted">Airline</p>
          <p className="text-sm font-medium">{flight.airline}</p>
        </div>

        {/* Times */}
        <div className="mb-3">
          <p className="text-sm text-text-muted">Schedule</p>
          <p className="text-sm">
            {formatDateTime(flight.departureTime, { withWeekday: true })} → {formatDateTime(flight.arrivalTime, { withWeekday: true })}
          </p>
        </div>

        {/* Stops & duration */}
        <div className="mb-3 flex gap-4">
          <div>
            <p className="text-sm text-text-muted">Stops</p>
            <p className="text-sm">{flight.stops}</p>
          </div>

          <div>
            <p className="text-sm text-text-muted">Duration</p>
            <p className="text-sm">{formatDuration(flight.duration)}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted">Price</p>
            <p className="text-lg font-semibold">
              ${flight.price.toFixed(0)}
            </p>
          </div>

          <button
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-background hover:opacity-90"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
