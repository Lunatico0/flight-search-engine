'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useFlights } from '@/hooks/useFlights'
import { useFilteredFlights } from '@/hooks/useFilteredFlights'
import { buildPriceChartData } from '@/lib/priceChart'

import { SearchForm } from '@/components/SearchForm/SearchForm'
import { FlightList } from '@/components/FlightList/FlightList'
import { PriceChart } from '@/components/PriceChart/PriceChart'
import { AirlinesFilter } from '@/components/Filters/AirlinesFilter'
import { PriceFilter } from '@/components/Filters/PriceFilter'
import { StopFilter } from '@/components/Filters/StopsFilter'
import { FiltersSkeleton } from '@/components/Filters/FiltersSkeleton'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const hasHydratedFromUrl = useRef(false)

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

  const searchKey = lastSearch
    ? `${lastSearch.origin}-${lastSearch.destination}-${lastSearch.date}`
    : null


  const {
    filteredFlights,
    filters,
    priceBounds,
    toggleAirline,
    setPriceRange,
    setStops,
  } = useFilteredFlights(flights, searchKey)

  /* ------------------------------------------------------------------
   * URL → STATE (hydration) — runs ONCE
   * ------------------------------------------------------------------ */
  useEffect(() => {
    if (hasHydratedFromUrl.current) return

    const origin = searchParams.get('origin')
    const destination = searchParams.get('destination')
    const date = searchParams.get('date')

    if (origin && destination && date) {
      searchFlights({ origin, destination, date })
    }

    hasHydratedFromUrl.current = true
  }, [
    searchParams,
    searchFlights,
    setStops,
    toggleAirline,
    setPriceRange,
  ])

  /* ------------------------------------------------------------------
   * STATE → URL (sync)
   * ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------
   * Derived state
   * ------------------------------------------------------------------ */
  const hasResults = isSuccess && filteredFlights.length > 0
  const hasNoResults = isSuccess && filteredFlights.length === 0

  const chartData = useMemo(
    () =>
      hasResults
        ? buildPriceChartData(filteredFlights)
        : [],
    [hasResults, filteredFlights]
  )

  const availableAirlines = useMemo(
    () =>
      isSuccess
        ? Array.from(new Set(flights.map((f) => f.airline)))
        : [],
    [isSuccess, flights]
  )

  const searchFormValues = useMemo(() => {
    const origin = searchParams.get('origin')
    const destination = searchParams.get('destination')
    const date = searchParams.get('date')

    if (!origin || !destination || !date) return undefined

    return { origin, destination, date }
  }, [searchParams])

  /* ------------------------------------------------------------------
   * Render
   * ------------------------------------------------------------------ */
  return (
    <>
      {/* Search */}
      <section className="mb-8">
        <SearchForm
          onSearch={searchFlights}
          initialValues={searchFormValues}
        />

      </section>

      {/* Content */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Filters */}
        <aside className="md:col-span-1 space-y-6">
          {isLoading && <FiltersSkeleton />}

          {hasResults && (
            <>
              <StopFilter
                value={filters.stops}
                onChange={setStops}
              />

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
              <FlightList flights={filteredFlights} />
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
    </>
  )
}
