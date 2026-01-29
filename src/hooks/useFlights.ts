import { useState } from 'react';
import { Flight } from '@/types/flight';

type SearchParams = {
  origin: string;
  destination: string;
  date: string;
};

export function useFlights() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function searchFlights(params: SearchParams) {
    setIsLoading(true)
    setError(null)

    try {
      const query = new URLSearchParams({
        origin: params.origin,
        destination: params.destination,
        date: params.date,
      })

      const response = await fetch(`/api/flights/search?${query}`)

      if (!response.ok) {
        throw new Error('Failed to fetch flights')
      }

      const data: Flight[] = await response.json()
      setFlights(data)
    } catch (err) {
      setError('Unable to load flights')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    flights,
    isLoading,
    error,
    searchFlights,
  }
}
