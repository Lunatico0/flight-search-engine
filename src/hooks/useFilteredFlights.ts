import { useMemo, useState } from 'react'
import { Flight } from '@/types/flight'
import { FlightFilters, StopsFilter } from '@/types/filters';
import { PRICE_TOLERANCE } from '@/lib/priceChart';

const DEFAULT_FILTERS: FlightFilters = {
  stops: 'any',
  priceRange: {
    min: 0,
    max: Infinity,
  },
  airlines: [],
}

export function useFilteredFlights(flights: Flight[]) {
  const [filters, setFilters] = useState<FlightFilters>(DEFAULT_FILTERS)

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      if (filters.stops !== 'any') {
        if (filters.stops === 2 && flight.stops < 2) return false
        if (filters.stops !== 2 && flight.stops !== filters.stops) return false
      }

      if (
        flight.price < filters.priceRange.min ||
        flight.price > filters.priceRange.max
      ) {
        return false
      }

      if (
        filters.airlines.length > 0 &&
        !filters.airlines.includes(flight.airline)
      ) {
        return false
      }

      return true
    })
  }, [flights, filters])

  function setStops(stops: StopsFilter) {
    setFilters((prev) => ({ ...prev, stops }))
  }

  function setPriceRange(min: number, max: number) {
    setFilters((prev) => ({
      ...prev,
      priceRange: { min, max },
    }))
  }

  function toggleAirline(airline: string) {
    setFilters((prev) => {
      const exists = prev.airlines.includes(airline)

      return {
        ...prev,
        airlines: exists
          ? prev.airlines.filter((a) => a !== airline)
          : [...prev.airlines, airline],
      }
    })
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
  }

  return {
    filters,
    filteredFlights,
    setStops,
    setPriceRange,
    toggleAirline,
    resetFilters,
  }
}
