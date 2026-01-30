'use client'

import { useEffect, useState } from 'react'

type SearchFormProps = {
  initialValues?: {
    origin: string
    destination: string
    date: string
  }
  onSearch: (params: {
    origin: string
    destination: string
    date: string
  }) => void
}

export function SearchForm({ onSearch, initialValues }: SearchFormProps) {
  const now = new Date()
  const today = now.toISOString().slice(0, 10)

  const [origin, setOrigin] = useState(initialValues?.origin ?? '')
  const [destination, setDestination] = useState(initialValues?.destination ?? '')
  const [date, setDate] = useState(initialValues?.date ?? today)

  // 🔑 sincroniza cuando cambia la URL
  useEffect(() => {
    if (!initialValues) return

    setOrigin(initialValues.origin)
    setDestination(initialValues.destination)
    setDate(initialValues.date)
  }, [initialValues])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch({
      origin: origin.trim().toUpperCase(),
      destination: destination.trim().toUpperCase(),
      date
    })
  }

  const fieldClass =
    " peer w-full rounded-md border border-border bg-background px-3 pt-5 pb-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 rounded-xl bg-surface p-4 md:grid-cols-3"
    >
      {/* Origin */}
      <div className="relative">
        <input
          id="origin"
          type="text"
          value={origin}
          onChange={(e) =>
            setOrigin(e.target.value.toUpperCase())
          }
          required
          placeholder=" "
          className={fieldClass}
        />
        <label
          htmlFor="origin"
          className="
            pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted transition-all
            peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary
            peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs
          "
        >
          Origin (e.g. EZE)
        </label>
      </div>

      {/* Destination */}
      <div className="relative">
        <input
          id="destination"
          type="text"
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value.toUpperCase())
          }
          required
          placeholder=" "
          className={fieldClass}
        />
        <label
          htmlFor="destination"
          className="
            pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted transition-all
            peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary
            peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs
          "
        >
          Destination (e.g. JFK)
        </label>
      </div>

      {/* Date */}
      <div className="relative">
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          placeholder=" "
          className={fieldClass}
        />
        <label
          htmlFor="date"
          className="
            pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted transition-all
            peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary
            peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs
          "
        >
          Date
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="md:col-span-3 rounded-md bg-primary py-2 text-sm font-medium text-background transition hover:opacity-90"
      >
        Search flights
      </button>
    </form>
  )
}
