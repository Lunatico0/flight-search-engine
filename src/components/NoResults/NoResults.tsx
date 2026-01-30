'use client'

import { AirplaneIcon } from "../icons/AirplaneIcon"

type NoResultsVariant =
  | 'idle'
  | 'no-results'
  | 'error'

type NoResultsProps = {
  variant: NoResultsVariant
  message?: string
}

const COPY: Record<NoResultsVariant, string> = {
  idle: 'Start by searching for a flight.',
  'no-results': 'No flights match your search criteria.',
  error: 'Something went wrong while fetching flights.',
}

export function NoResults({
  variant,
  message,
}: NoResultsProps) {
  const text =
    variant === 'error' && message
      ? message
      : COPY[variant]

  return (
    <div className="mt-8 flex flex-col items-center gap-4 rounded-xl bg-surface p-8 text-center">

      {/* Text */}
      <p
        className={`text-sm ${variant === 'error'
          ? 'text-danger'
          : 'text-text-muted'
          }`}
      >
        {text}
      </p>

      {/* SVG */}
      <AirplaneIcon className={`mx-auto h-40 w-40 md:h-72 md:w-72 ${variant === 'idle' ? 'text-text' : 'text-text-muted'}`} />

    </div>
  )
}
