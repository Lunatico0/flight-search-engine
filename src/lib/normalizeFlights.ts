import { Flight } from '@/types/flight'

export function normalizeFlights(
  amadeusResponse: any
): Flight[] {
  const flights = amadeusResponse.data
  const carriers = amadeusResponse.dictionaries?.carriers ?? {}

  return flights.map((offer: any) => {
    const itinerary = offer.itineraries[0]
    const segments = itinerary.segments

    const departure = segments[0]
    const arrival = segments[segments.length - 1]

    const airlineCode = offer.validatingAirlineCodes[0]

    return {
      id: offer.id,
      airline: carriers[airlineCode] ?? airlineCode,
      price: Number(offer.price.total),
      stops: segments.length - 1,
      departureTime: departure.departure.at,
      arrivalTime: arrival.arrival.at,
      duration: itinerary.duration,
    }
  })
}
