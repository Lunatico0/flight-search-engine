'use client'

import { useMemo } from 'react'

import { useFlights } from '@/hooks/useFlights'
import { useFilteredFlights } from '@/hooks/useFilteredFlights'
import { buildPriceChartData } from '@/lib/priceChart'

import { SearchForm } from '@/components/SearchForm/SearchForm'
import { FlightList } from '@/components/FlightList/FlightList'
import { PriceChart } from '@/components/PriceChart/PriceChart'
import { AirlinesFilter } from '@/components/Filters/AirlinesFilter'
import { PriceFilter } from '@/components/Filters/PriceFilter'
import { StopFilter } from '@/components/Filters/StopsFilter'
import { FiltersSkeleton } from '../components/Filters/FiltersSkeleton'

export default function Home() {
  const { flights, isLoading, error, searchFlights } = useFlights()

  const {
    filteredFlights,
    filters,
    toggleAirline,
    setPriceRange,
    setStops,
  } = useFilteredFlights(flights)

  const chartData = useMemo(
    () => buildPriceChartData(filteredFlights),
    [filteredFlights]
  )

  const availableAirlines = useMemo(
    () => Array.from(new Set(flights.map((f) => f.airline))),
    [flights]
  )

  const hasResults = flights.length > 0

  const { minPrice, maxPrice } = useMemo(() => {
    if (flights.length === 0) {
      return { minPrice: null, maxPrice: null }
    }

    const prices = flights.map((f) => f.price)

    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    }
  }, [flights])

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-text">
            Flight Search
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Search, filter and analyze flight prices
          </p>
        </header>

        {/* Search */}
        <section className="mb-8">
          <SearchForm onSearch={searchFlights} />
        </section>

        {/* Content */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Filters */}
          <aside className="space-y-6 md:col-span-1">
            {/* Loading state → skeleton */}
            {isLoading && <FiltersSkeleton />}

            {/* Results loaded → real filters */}
            {!isLoading && hasResults && (
              <>
                <StopFilter
                  value={filters.stops}
                  onChange={setStops}
                />

                {minPrice !== null &&
                  maxPrice !== null &&
                  minPrice < maxPrice && (
                    <PriceFilter
                      min={minPrice}
                      max={maxPrice}
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
          <div className={`space-y-6 md:col-span-3`}>
            <PriceChart
              data={chartData}
              isLoading={isLoading}
            />

            <FlightList
              flights={filteredFlights}
              isLoading={isLoading}
            />
          </div>
        </section>

        {/* Error */}
        {error && (
          <p className="mt-6 text-sm text-danger">
            Something went wrong while fetching flights.
          </p>
        )}
      </div>
    </main>
  )
}
