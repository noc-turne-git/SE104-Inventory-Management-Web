import { apiFetch } from './client'
import type {
  ApiAuthResponse,
  LoginRequest,
  SignupRequest,
  SuccessResponse,
  VerifyEmailRequest,
} from '@/types/auth'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USERNAME_KEY = 'username'

export interface AuthSession {
  username: string
  accessToken: string
  refreshToken: string
}

export function loadAuthSession(): AuthSession | null {
  const username = localStorage.getItem(USERNAME_KEY)
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

  if (!username || !accessToken || !refreshToken) return null
  return { username, accessToken, refreshToken }
}

export function clearAuthSession(): void {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export async function login(data: LoginRequest): Promise<AuthSession> {
  const result = await apiFetch<ApiAuthResponse>('auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (!result.success) {
    throw new Error(result.message ?? 'Đăng nhập thất bại.')
  }

  const session: AuthSession = {
    username: data.username,
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  }

  localStorage.setItem(USERNAME_KEY, session.username)
  localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken)

  return session
}

export async function signup(data: SignupRequest): Promise<void> {
  const result = await apiFetch<SuccessResponse>('auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (!result.success) {
    throw new Error(result.message ?? 'Đăng ký thất bại.')
  }
}

export async function verifyEmail(data: VerifyEmailRequest): Promise<void> {
  const result = await apiFetch<SuccessResponse>('auth/verify-email', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (!result.success) {
    throw new Error(result.message ?? 'Xác thực email thất bại.')
  }
}

