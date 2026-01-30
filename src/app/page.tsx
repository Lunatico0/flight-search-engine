import { Suspense } from 'react'
import HomeClientWrapper from './HomeClientWrapper'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">Flight Search</h1>
          <p className="mt-1 text-sm text-text-muted">
            Search, filter and analyze flight prices
          </p>
        </header>

        <Suspense fallback={null}>
          <HomeClientWrapper />
        </Suspense>
      </div>
    </main>
  )
}
