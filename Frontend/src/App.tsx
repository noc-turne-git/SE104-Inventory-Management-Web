import { useEffect, useState, FormEvent, ChangeEvent } from 'react'
import './App.css'
import { clearAuthSession, loadAuthSession, login, signup } from './api/auth'
import VerifyEmailPage from './VerifyEmailPage'

interface User {
  username: string
}

function App() {
  if (window.location.pathname === '/verify-email') {
    return <VerifyEmailPage />
  }

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    const session = loadAuthSession()
    if (session) setUser({ username: session.username })
  }, [])

  const resetMessages = (): void => {
    setError('')
    setSuccess('')
  }

  const clearForm = (): void => {
    setUsername('')
    setEmail('')
    setPhone('')
    setAddress('')
    setPassword('')
    setConfirmPassword('')
  }

  const switchMode = (nextMode: 'login' | 'register'): void => {
    setMode(nextMode)
    clearForm()
    resetMessages()
  }

  const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    resetMessages()

    if (!username.trim() || !email.trim() || !password.trim() || !phone.trim() || !address.trim()) {
      setError('Vui lòng điền đầy đủ thông tin.')
      return
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.')
      return
    }

    setIsSubmitting(true)
    try {
      await signup({ username, email, password, phone, address })
      setSuccess('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.')
      clearForm()
      setMode('login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    resetMessages()

    if (!username.trim() || !password.trim()) {
      setError('Vui lòng điền tên đăng nhập và mật khẩu.')
      return
    }

    setIsSubmitting(true)
    try {
      const session = await login({ username, password })
      setUser({ username: session.username })
      setSuccess('Đăng nhập thành công!')
      clearForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = (): void => {
    clearAuthSession()
    setUser(null)
    setSuccess('Bạn đã đăng xuất.')
  }

  if (user) {
    return (
      <main className="auth-root">
        <section className="auth-card">
          <h1>Xin chào, {user.username}!</h1>
          <p>Bạn đã đăng nhập.</p>
          <button className="primary" onClick={handleLogout}>
            Đăng xuất
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="auth-root">
      <section className="auth-card">
        <header className="auth-header">
          <h1>{mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h1>
          <p>
            {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
            <button className="link" onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Đăng ký' : 'Đăng nhập'}
            </button>
          </p>
        </header>

        <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="auth-form">
          <label>
            Tên đăng nhập
            <input
              type="text"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="username"
            />
          </label>

          {mode === 'register' && (
            <>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Số điện thoại
                <input
                  type="tel"
                  value={phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                  required
                  autoComplete="tel"
                  placeholder="09xxxxxxxx"
                />
              </label>

              <label>
                Địa chỉ
                <input
                  type="text"
                  value={address}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                  required
                  autoComplete="street-address"
                  placeholder="Số nhà, đường, quận/huyện..."
                />
              </label>
            </>
          )}

          <label>
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              placeholder="••••••••"
            />
          </label>

          {mode === 'register' && (
            <label>
              Nhập lại mật khẩu
              <input
                type="password"
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </label>
          )}

          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}

          <button type="submit" className="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Đang xử lý...' : mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
