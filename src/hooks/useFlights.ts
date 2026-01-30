import { useState, useCallback, useRef } from 'react'
import { Flight } from '@/types/flight'

export type SearchParams = {
  origin: string
  destination: string
  date: string
}

export type FlightsStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error'

export function useFlights() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [status, setStatus] = useState<FlightsStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [lastSearch, setLastSearch] = useState<SearchParams | null>(null)

  const abortRef = useRef<AbortController | null>(null)
  const requestIdRef = useRef(0)

  const searchFlights = useCallback(
    async (params: SearchParams) => {
      // Cancel previous request
      abortRef.current?.abort()

      const controller = new AbortController()
      abortRef.current = controller

      const requestId = ++requestIdRef.current

      setStatus('loading')
      setError(null)
      setLastSearch(params)

      try {
        const query = new URLSearchParams({
          origin: params.origin,
          destination: params.destination,
          date: params.date,
        })

        const response = await fetch(
          `/api/flights/search?${query.toString()}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch flights')
        }

        const data: Flight[] = await response.json()

        // Ignore stale responses
        if (requestId !== requestIdRef.current) return

        setFlights(data)
        setStatus('success')
      } catch (err) {
        if ((err as any)?.name === 'AbortError') return

        if (requestId !== requestIdRef.current) return

        setFlights([])
        setStatus('error')
        setError('Unable to load flights')
      }
    },
    []
  )

  return {
    // data
    flights,
    lastSearch,

    // state
    status,
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',

    // error
    error,

    // actions
    searchFlights,
  }
}
