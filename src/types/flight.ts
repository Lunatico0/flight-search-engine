export type FlightId = string
export type AirlineName = string

export type ISODateTime = string
export type ISODuration = string

export type StopsCount = 0 | 1 | 2 | number

export type Flight = {
  id: FlightId
  airline: AirlineName
  price: number
  stops: StopsCount
  departureTime: ISODateTime
  arrivalTime: ISODateTime
  duration: ISODuration
}
