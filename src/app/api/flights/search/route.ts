import { NextRequest, NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/amadeus'
import { normalizeFlights } from '@/lib/normalizeFlights'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const departureDate = searchParams.get('date')

  if (!origin || !destination || !departureDate) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  const token = await getAccessToken()

  const url = new URL(
    `${process.env.AMADEUS_BASE_URL}/v2/shopping/flight-offers`
  )

  url.search = new URLSearchParams({
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate,
    adults: '1',
    currencyCode: 'USD',
    max: '20',
  }).toString()

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const rawData = await res.json();

  if (!res.ok) {
    return NextResponse.json([], { status: 200 })
  }

  const flights = normalizeFlights(rawData);
  return NextResponse.json(flights)
}
