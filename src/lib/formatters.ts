
//  "2026-02-03T15:25:00" → "03 Feb · 15:25"
//  withWeekday → "Tue 03 Feb · 15:25"

export function formatDateTime(
  iso: string,
  options?: {
    withWeekday?: boolean
  }
): string {
  const date = new Date(iso)

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    ...(options?.withWeekday && { weekday: 'short' }),
  })

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return `${dateFormatter.format(date)} · ${timeFormatter.format(date)}`
}


// Formats an ISO datetime string into time only.
// Example:
// "2026-02-03T06:10:00" → "06:10"

export function formatTime(iso: string): string {
  const date = new Date(iso)

  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}


// "PT29H55M" → "29h 55m"
// "PT14H" → "14h"
// "PT45M" → "45m"

export function formatDuration(isoDuration: string): string {
  // Match hours and minutes from ISO 8601 duration
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/)

  if (!match) return isoDuration

  const hours = match[1] ? Number(match[1]) : 0
  const minutes = match[2] ? Number(match[2]) : 0

  const parts: string[] = []

  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)

  return parts.join(' ') || '0m'
}
