'use client'

import { StopsFilter } from '@/types/filters'

type StopFilterProps = {
  value: StopsFilter
  onChange: (value: StopsFilter) => void
}

const OPTIONS: {
  label: string
  value: StopsFilter
}[] = [
    { label: 'Any', value: 'any' },
    { label: 'Non-stop', value: 0 },
    { label: '1 stop', value: 1 },
    { label: '2+ stops', value: 2 },
  ]

export function StopFilter({ value, onChange }: StopFilterProps) {
  return (
    <fieldset
      className="rounded-xl bg-surface p-4"
      aria-labelledby="stops-filter-label"
    >
      <legend
        id="stops-filter-label"
        className="mb-3 text-sm font-medium text-text-muted"
      >
        Stops
      </legend>

      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-describedby="stops-filter-label"
      >
        {OPTIONS.map((option) => {
          const isActive = value === option.value

          return (
            <button
              key={String(option.value)}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(option.value)}
              className={`
                rounded-md px-3 py-1.5 text-sm transition
                focus:outline-none focus:ring-2 focus:ring-primary
                ${isActive
                  ? 'bg-primary text-background'
                  : 'bg-background text-text hover:bg-surface-muted'
                }
              `}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
