import { Flight } from '@/types/flight'

export type PriceChartItem = {
  airline: string
  averagePrice: number
}

export const PRICE_TOLERANCE = 150

export function buildPriceChartData(
  flights: Flight[]
): PriceChartItem[] {
  const grouped = new Map<string, number[]>()

  flights.forEach((flight) => {
    const prices = grouped.get(flight.airline) ?? []
    prices.push(flight.price)
    grouped.set(flight.airline, prices)
  })

  return Array.from(grouped.entries()).map(([airline, prices]) => ({
    airline,
    averagePrice:
      prices.reduce((sum, price) => sum + price, 0) / prices.length,
  }))
}
