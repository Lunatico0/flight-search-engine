'use client'

type AirlinesFilterProps = {
  airlines: string[]
  selected: string[]
  onToggle: (airline: string) => void
}

export function AirlinesFilter({
  airlines,
  selected,
  onToggle,
}: AirlinesFilterProps) {
  if (airlines.length === 0) {
    return null
  }

  return (
    <div className="rounded-xl bg-surface p-4">
      <h3 className="mb-3 text-sm font-medium text-text-muted">
        Airlines
      </h3>

      <ul className="space-y-1">
        {airlines.map((airline) => {
          const isSelected = selected.includes(airline)

          return (
            <li key={airline}>
              <label
                className={`
                  flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm transition
                  focus-within:outline focus-within:outline-primary
                  ${
                    isSelected
                      ? 'bg-primary/10 text-primary'
                      : 'text-text hover:bg-surface-muted'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle(airline)}
                  className="sr-only"
                />

                <span className="h-3.5 w-3.5 rounded border border-border flex items-center justify-center">
                  {isSelected && (
                    <span className="h-2 w-2 rounded-sm bg-primary" />
                  )}
                </span>

                <span className="truncate">
                  {airline}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
