'use client'

import { Range } from 'react-range'
import { NumericRange } from '@/types/range'

type PriceFilterProps = {
  min: number
  max: number
  value: NumericRange
  onChange: (range: NumericRange) => void
}

const STEP = 1

export function PriceFilter({
  min,
  max,
  value,
  onChange,
}: PriceFilterProps) {
  const hasValidRange = max > min

  if (!hasValidRange) {
    return (
      <div className="rounded-xl bg-surface p-4">
        <h3 className="mb-2 text-sm font-medium text-text-muted">
          Price
        </h3>

        <div className="text-lg font-semibold text-text">
          ${min.toFixed(2)}
        </div>

        <p className="text-xs text-text-soft">
          All available flights have the same price
        </p>
      </div>
    )
  }

  const values: [number, number] = [
    Math.max(value.min, min),
    Math.min(value.max, max),
  ]

  function updateRange(newMin: number, newMax: number) {
    onChange({
      min: Math.max(newMin, min),
      max: Math.min(newMax, max),
    })
  }

  return (
    <div className="rounded-xl bg-surface p-4">
      <h3 className="mb-2 text-sm font-medium text-text-muted">
        Price range
      </h3>

      {/* numeric inputs */}
      <div className="mb-3 flex items-center gap-3">
        <input
          type="number"
          min={min}
          max={values[1]}
          value={values[0]}
          onChange={(e) =>
            updateRange(Number(e.target.value), values[1])
          }
          className="h-10 w-full rounded-md bg-surface-muted px-2 text-sm ring-1 ring-border"
        />

        <span className="text-text-soft">–</span>

        <input
          type="number"
          min={values[0]}
          max={max}
          value={values[1]}
          onChange={(e) =>
            updateRange(values[0], Number(e.target.value))
          }
          className="h-10 w-full rounded-md bg-surface-muted px-2 text-sm ring-1 ring-border"
        />
      </div>

      <Range
        values={values}
        step={1}
        min={min}
        max={max}
        onChange={([newMin, newMax]) =>
          updateRange(newMin, newMax)
        }
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-1 w-full rounded bg-surface-muted"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="h-4 w-4 rounded-full bg-primary"
          />
        )}
      />

      <p className="mt-2 text-xs text-text-muted">
        ${values[0]} – ${values[1]}
      </p>
    </div>
  )
}
