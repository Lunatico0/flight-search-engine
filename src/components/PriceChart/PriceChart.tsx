'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { PriceChartItem } from '@/lib/priceChart'
import { PriceChartSkeleton } from './PriceChartSkeleton'

type PriceChartProps = {
  data: PriceChartItem[]
  isLoading?: boolean
}

export function PriceChart({
  data,
  isLoading = false,
}: PriceChartProps) {
  if (isLoading) {
    return <PriceChartSkeleton />
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl bg-surface p-4">
        <p className="text-sm text-text-muted">
          No price data available.
        </p>
      </div>
    )
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  return (
    <div className="rounded-xl bg-surface p-4">
      <h2 className="mb-4 text-sm font-medium text-text-muted">
        Average price by airline
      </h2>

      <ResponsiveContainer width="100%" className='relative -pl-8' height={280}>
        <LineChart
          data={data}
          margin={{ left: isMobile ? 8 : 24 }}
        >
          <XAxis
            dataKey="airline"
            tick={{ fontSize: 12 }}
            stroke="var(--color-border)"
          />

          <YAxis
            width={isMobile ? 32 : 48}
            tick={{ fontSize: 12 }}
            stroke="var(--color-border)"
            tickFormatter={(value) => `$${value}`}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value?: number) => [
              value !== undefined ? `$${value.toFixed(0)}` : 'N/A',
              'Avg price',
            ]}
          />

          <Line
            type="monotone"
            dataKey="averagePrice"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
