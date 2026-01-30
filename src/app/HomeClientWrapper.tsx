'use client'

import { useSearchParams } from 'next/navigation'
import HomeClient from './HomeClient'

export default function HomeClientWrapper() {
  const searchParams = useSearchParams()

  const initialSearch = {
    origin: searchParams.get('origin'),
    destination: searchParams.get('destination'),
    date: searchParams.get('date'),
  }

  const hasInitialSearch =
    initialSearch.origin &&
    initialSearch.destination &&
    initialSearch.date

  return (
    <HomeClient initialSearch={
      hasInitialSearch
        ? {
          origin: initialSearch.origin!,
          destination: initialSearch.destination!,
          date: initialSearch.date!,
        }
        : null
    }
    />
  )
}
