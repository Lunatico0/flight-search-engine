'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useFlights } from '@/hooks/useFlights'
import { useFilteredFlights } from '@/hooks/useFilteredFlights'
import { buildPriceChartData } from '@/lib/priceChart'
import { Flight } from '@/types/flight'

import { SearchForm } from '@/components/SearchForm/SearchForm'
import { FlightList } from '@/components/FlightList/FlightList'
import { PriceChart } from '@/components/PriceChart/PriceChart'
import { AirlinesFilter } from '@/components/Filters/AirlinesFilter'
import { PriceFilter } from '@/components/Filters/PriceFilter'
import { StopFilter } from '@/components/Filters/StopsFilter'
import { FiltersSkeleton } from '@/components/Filters/FiltersSkeleton'
import { SortSelect } from '@/components/SortSelect'
import dynamic from 'next/dynamic'
const FlightDetailsModal = dynamic(
  () => import('../components/FlightDetailsModal').then(m => m.FlightDetailsModal),
  { ssr: false }
)

type HomeClientProps = {
  initialSearch: {
    origin: string
    destination: string
    date: string
  } | null
}

export default function HomeClient({ initialSearch }: HomeClientProps) {
  const router = useRouter()
  const hasHydratedFromUrl = useRef(false)
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)

  const {
    flights,
    lastSearch,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    error,
    searchFlights,
  } = useFlights()

  // 🔑 hidrata búsqueda inicial desde URL (una sola vez)
  useEffect(() => {
    if (!initialSearch) return
    if (hasHydratedFromUrl.current) return

    searchFlights(initialSearch)
    hasHydratedFromUrl.current = true
  }, [initialSearch, searchFlights])

  const searchKey = lastSearch
    ? `${lastSearch.origin}-${lastSearch.destination}-${lastSearch.date}`
    : null

  const {
    filteredFlights,
    filters,
    priceBounds,
    sort,
    sortedFlights,
    toggleAirline,
    setPriceRange,
    setStops,
    setSort,
  } = useFilteredFlights(flights, searchKey)

  // STATE → URL
  useEffect(() => {
    if (!isSuccess || !lastSearch) return

    const params = new URLSearchParams({
      origin: lastSearch.origin,
      destination: lastSearch.destination,
      date: lastSearch.date,
    })

    if (filters.stops !== 'any') {
      params.set('stops', String(filters.stops))
    }

    if (filters.airlines.length > 0) {
      params.set('airlines', filters.airlines.join(','))
    }

    params.set('minPrice', String(filters.priceRange.min))
    params.set('maxPrice', String(filters.priceRange.max))

    router.replace(`?${params.toString()}`, { scroll: false })
  }, [isSuccess, lastSearch, filters, router])

  // Derived state
  const hasResults = isSuccess && filteredFlights.length > 0
  const hasNoResults = isSuccess && filteredFlights.length === 0

  const chartData = useMemo(
    () =>
      hasResults
        ? buildPriceChartData(sortedFlights)
        : [],
    [hasResults, sortedFlights]
  )

  const availableAirlines = useMemo(
    () =>
      isSuccess
        ? Array.from(new Set(flights.map((f) => f.airline)))
        : [],
    [isSuccess, flights]
  )

  return (
    <>
      {/* Search */}
      <section className="mb-8">
        <SearchForm
          onSearch={searchFlights}
          initialValues={initialSearch ?? undefined}
        />
      </section>

      {/* Content */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Filters */}
        <aside className="md:col-span-1 space-y-6">
          {isLoading && <FiltersSkeleton />}

          {hasResults && (
            <>
              <StopFilter value={filters.stops} onChange={setStops} />

              {priceBounds.min < priceBounds.max && (
                <PriceFilter
                  min={priceBounds.min}
                  max={priceBounds.max}
                  value={filters.priceRange}
                  onChange={(range) =>
                    setPriceRange(range.min, range.max)
                  }
                />
              )}

              <AirlinesFilter
                airlines={availableAirlines}
                selected={filters.airlines}
                onToggle={toggleAirline}
              />
            </>
          )}
        </aside>

        {/* Results */}
        <div className="md:col-span-3 space-y-6">
          {isLoading && (
            <>
              <PriceChart data={[]} isLoading />
              <FlightList flights={[]} isLoading />
            </>
          )}

          {hasResults && (
            <>
              <PriceChart data={chartData} />

              <SortSelect
                value={sort}
                onChange={setSort}
                length={sortedFlights.length}
              />

              <FlightList
                flights={sortedFlights}
                onSelectFlight={setSelectedFlight}
              />
            </>
          )}
        </div>
      </section>

      {/* Empty states */}
      {hasNoResults && (
        <div className="mt-8 rounded-xl bg-surface p-6 text-center">
          <p className="text-sm text-text-muted">
            No flights match your search criteria.
          </p>
        </div>
      )}

      {isIdle && (
        <div className="mt-8 rounded-xl bg-surface p-6 text-center">
          <p className="text-sm text-text-muted">
            Start by searching for a flight.
          </p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="mt-6 text-sm text-danger">
          {error ??
            'Something went wrong while fetching flights.'}
        </p>
      )}

      {selectedFlight && (
        <FlightDetailsModal
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
        />
      )}

    </>
  )
}
