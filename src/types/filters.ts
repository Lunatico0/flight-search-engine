import { NumericRange } from './range'

export type StopsFilter = 'any' | 0 | 1 | 2

export type AirlineCode = string

export type FlightFilters = {
  stops: StopsFilter
  priceRange: NumericRange
  airlines: AirlineCode[]
}
