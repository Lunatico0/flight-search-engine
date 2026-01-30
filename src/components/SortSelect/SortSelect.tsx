'use client'

import { SortState, SortKey, SortOrder } from '@/hooks/useFilteredFlights'

type SortSelectProps = {
  value: SortState
  length: number
  onChange: (next: SortState) => void
}

const OPTIONS: {
  label: string
  key: SortKey
  order: SortOrder
}[] = [
    { label: 'Price: low to high', key: 'price', order: 'asc' },
    { label: 'Price: high to low', key: 'price', order: 'desc' },

    { label: 'Duration: shortest', key: 'duration', order: 'asc' },
    { label: 'Duration: longest', key: 'duration', order: 'desc' },

    { label: 'Departure: earliest', key: 'departure', order: 'asc' },
    { label: 'Departure: latest', key: 'departure', order: 'desc' },

    { label: 'Airline: A–Z', key: 'airline', order: 'asc' },
    { label: 'Airline: Z–A', key: 'airline', order: 'desc' },
  ]

export function SortSelect({ value, length, onChange }: SortSelectProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const [key, order] = e.target.value.split(':') as [
      SortKey,
      SortOrder
    ]

    onChange({ key, order })
  }

  return (
    <fieldset
      className="rounded-xl bg-surface p-4 w-full"
      aria-labelledby="sort-filter-label"
    >
      <legend className="px-2 text-sm font-medium text-text-muted">
        Sort by
      </legend>

      <div className="flex flex-col md:flex-row-reverse md:justify-between md:items-center gap-2">
        <select
          value={`${value.key}:${value.order}`}
          onChange={handleChange}
          className="
            md:w-fit rounded-md border border-border bg-background
            px-3 py-2 text-sm text-text
            focus:outline-none focus:ring-2 focus:ring-primary
          "
        >
          {OPTIONS.map((option) => (
            <option
              key={`${option.key}:${option.order}`}
              value={`${option.key}:${option.order}`}
            >
              {option.label}
            </option>
          ))}
        </select>

        <p className="text-xs text-text-muted">
          {length} flights found
        </p>
      </div>

    </fieldset>
  )
}
