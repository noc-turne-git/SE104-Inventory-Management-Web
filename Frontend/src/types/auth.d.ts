export interface LoginRequest {
  username: string
  password: string
}

export interface SignupRequest {
  username: string
  password: string
  email: string
  phone: string
  address: string
}

export interface VerifyEmailRequest {
  Email: string
  Token: string
}

export interface ApiAuthResponse {
  success: boolean
  accessToken: string
  refreshToken: string
  message?: string
}

export interface SuccessResponse {
  success: boolean
  message?: string
}
