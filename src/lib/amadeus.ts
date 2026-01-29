let accessToken: string = ''
let tokenExpiresAt = 0

export async function getAccessToken(): Promise<string> {
  const now = Date.now()

  if (accessToken && now < tokenExpiresAt) {
    return accessToken
  }

  const res = await fetch(
    `${process.env.AMADEUS_BASE_URL}/v1/security/oauth2/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY!,
        client_secret: process.env.AMADEUS_API_SECRET!,
      }),
    }
  )

  if (!res.ok) {
    throw new Error('Failed to authenticate with Amadeus')
  }

  const data = await res.json()

  accessToken = data.access_token
  tokenExpiresAt = now + data.expires_in * 1000

  return accessToken
}
