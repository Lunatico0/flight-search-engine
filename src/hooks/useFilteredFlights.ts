import { useEffect, useMemo, useRef, useState } from 'react'
import { Flight } from '@/types/flight'
import { FlightFilters, StopsFilter } from '@/types/filters'

function getPriceBounds(flights: Flight[]) {
  if (flights.length === 0) {
    return { min: 0, max: 0 }
  }

  const prices = flights.map((f) => f.price)

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

function parseFiltersFromUrl(
  bounds: { min: number; max: number }
): FlightFilters {
  if (typeof window === 'undefined') {
    return {
      stops: 'any',
      priceRange: bounds,
      airlines: [],
    }
  }

  const params = new URLSearchParams(window.location.search)

  const stopsParam = params.get('stops')
  const minPriceParam = params.get('minPrice')
  const maxPriceParam = params.get('maxPrice')
  const airlinesParam = params.get('airlines')

  const stops: StopsFilter =
    stopsParam === '0' || stopsParam === '1' || stopsParam === '2'
      ? (Number(stopsParam) as StopsFilter)
      : 'any'

  const min =
    minPriceParam !== null
      ? Math.max(Number(minPriceParam), bounds.min)
      : bounds.min

  const max =
    maxPriceParam !== null
      ? Math.min(Number(maxPriceParam), bounds.max)
      : bounds.max

  const airlines =
    airlinesParam?.split(',').filter(Boolean) ?? []

  return {
    stops,
    priceRange: { min, max },
    airlines,
  }
}

export function useFilteredFlights(
  flights: Flight[],
  searchKey: string | null
) {
  /* ---------------- Derived bounds ---------------- */

  const priceBounds = useMemo(
    () => getPriceBounds(flights),
    [flights]
  )

  /* ---------------- State ---------------- */

  const hasHydratedFromUrl = useRef(false)

  const [filters, setFilters] = useState<FlightFilters>({
    stops: 'any',
    priceRange: priceBounds,
    airlines: [],
  })

  /* ---------------- Hydrate from URL (once) ---------------- */

  useEffect(() => {
    if (!searchKey) return
    if (flights.length === 0) return

    setFilters({
      stops: 'any',
      priceRange: priceBounds,
      airlines: [],
    })
  }, [searchKey, priceBounds.min, priceBounds.max])

  /* ---------------- Reset on new dataset ---------------- */

  useEffect(() => {
    if (!hasHydratedFromUrl.current) return

    setFilters((prev) => ({
      ...prev,
      priceRange: {
        min: Math.max(prev.priceRange.min, priceBounds.min),
        max: Math.min(prev.priceRange.max, priceBounds.max),
      },
    }))
  }, [priceBounds.min, priceBounds.max])


  /* ---------------- Filtering logic ---------------- */

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      // Stops
      if (filters.stops !== 'any') {
        if (filters.stops === 2 && flight.stops < 2) return false
        if (filters.stops !== 2 && flight.stops !== filters.stops)
          return false
      }

      // Price
      if (
        flight.price < filters.priceRange.min ||
        flight.price > filters.priceRange.max
      ) {
        return false
      }

      // Airline
      if (
        filters.airlines.length > 0 &&
        !filters.airlines.includes(flight.airline)
      ) {
        return false
      }

      return true
    })
  }, [flights, filters])

  /* ---------------- Actions ---------------- */

  function setStops(stops: StopsFilter) {
    setFilters((prev) => ({
      ...prev,
      stops,
    }))
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
    setFilters({
      stops: 'any',
      priceRange: priceBounds,
      airlines: [],
    })
  }

  return {
    filters,
    filteredFlights,
    priceBounds,
    setStops,
    setPriceRange,
    toggleAirline,
    resetFilters,
  }
}
