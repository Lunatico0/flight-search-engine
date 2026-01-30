const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
})

const DATE_WITH_WEEKDAY_FORMATTER = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
})

const TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export function formatDateTime(
  iso: string,
  options?: {
    withWeekday?: boolean
  }
): string {
  const date = new Date(iso)

  const datePart = options?.withWeekday
    ? DATE_WITH_WEEKDAY_FORMATTER.format(date)
    : DATE_FORMATTER.format(date)

  const timePart = TIME_FORMATTER.format(date)

  return `${datePart} · ${timePart}`
}

// "2026-02-03T06:10:00" → "06:10"
export function formatTime(iso: string): string {
  return TIME_FORMATTER.format(new Date(iso))
}

export function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/)

  if (!match) return isoDuration

  const hours = match[1] ? Number(match[1]) : 0
  const minutes = match[2] ? Number(match[2]) : 0

  if (hours === 0 && minutes === 0) return '0m'

  const parts: string[] = []
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)

  return parts.join(' ')
}
