import { useEffect, useMemo, useRef, useState } from 'react'
import { Flight } from '@/types/flight'
import { FlightFilters, StopsFilter } from '@/types/filters'

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------
 * Sorting
 * ------------------------------------------------------------------ */

export type SortKey =
  | 'price'
  | 'duration'
  | 'departure'
  | 'airline'

export type SortOrder = 'asc' | 'desc'

export type SortState = {
  key: SortKey
  order: SortOrder
}

function sortFlights(
  flights: Flight[],
  sort: SortState
) {
  const sorted = [...flights]

  sorted.sort((a, b) => {
    let aValue: number | string
    let bValue: number | string

    switch (sort.key) {
      case 'price':
        aValue = a.price
        bValue = b.price
        break

      case 'duration': {
        const toMinutes = (d: string) => {
          const h = d.match(/(\d+)H/)?.[1] ?? 0
          const m = d.match(/(\d+)M/)?.[1] ?? 0
          return Number(h) * 60 + Number(m)
        }
        aValue = toMinutes(a.duration)
        bValue = toMinutes(b.duration)
        break
      }

      case 'departure':
        aValue = new Date(a.departureTime).getTime()
        bValue = new Date(b.departureTime).getTime()
        break

      case 'airline':
        aValue = a.airline
        bValue = b.airline
        break
    }

    if (aValue < bValue) return sort.order === 'asc' ? -1 : 1
    if (aValue > bValue) return sort.order === 'asc' ? 1 : -1
    return 0
  })

  return sorted
}

/* ------------------------------------------------------------------
 * Hook
 * ------------------------------------------------------------------ */

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

  const [sort, setSort] = useState<SortState>({
    key: 'price',
    order: 'asc',
  })

  /* ---------------- Reset on new search ---------------- */

  useEffect(() => {
    if (!searchKey) return
    if (flights.length === 0) return

    setFilters({
      stops: 'any',
      priceRange: priceBounds,
      airlines: [],
    })

    setSort({
      key: 'price',
      order: 'asc',
    })
  }, [searchKey, priceBounds.min, priceBounds.max, flights.length])

  /* ---------------- Clamp price range on bounds change ---------------- */

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

  /* ---------------- Sorting logic ---------------- */

  const sortedFlights = useMemo(
    () => sortFlights(filteredFlights, sort),
    [filteredFlights, sort]
  )

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
    // data
    filters,
    filteredFlights,
    sortedFlights,
    priceBounds,
    sort,

    // actions
    setStops,
    setPriceRange,
    toggleAirline,
    resetFilters,
    setSort,
  }
}
