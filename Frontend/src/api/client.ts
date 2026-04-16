export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

const API_DEBUG =
  import.meta.env.VITE_API_DEBUG === '1' ||
  (import.meta.env.DEV && import.meta.env.VITE_API_DEBUG !== '0')

function joinUrl(baseUrl: string, path: string) {
  const normalizedBase = baseUrl.replace(/\/+$/, '')
  const normalizedPath = path.replace(/^\/+/, '')
  return `${normalizedBase}/${normalizedPath}`
}

function previewBody(body: RequestInit['body']) {
  if (typeof body !== 'string') return body
  if (body.length <= 300) return body
  return `${body.slice(0, 300)}...`
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem('access_token')

  const url = joinUrl(API_BASE_URL, path)
  const method = (init.method ?? 'GET').toUpperCase()
  const start = performance.now()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(init.headers as Record<string, string> | undefined),
  }

  if (API_DEBUG) {
    // eslint-disable-next-line no-console
    console.groupCollapsed(`[api] -> ${method} ${url}`)
    // eslint-disable-next-line no-console
    console.log({
      method,
      url,
      hasAuth: Boolean(token),
      body: previewBody(init.body),
    })
    // eslint-disable-next-line no-console
    console.groupEnd()
  }

  const response = await fetch(url, { ...init, headers })

  if (API_DEBUG) {
    const durationMs = Math.round(performance.now() - start)
    // eslint-disable-next-line no-console
    console.log(`[api] <- ${method} ${url} ${response.status} (${durationMs}ms)`)
  }

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    throw new Error(
      `API ${response.status} ${response.statusText}${
        errorBody ? `: ${errorBody}` : ''
      }`,
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

