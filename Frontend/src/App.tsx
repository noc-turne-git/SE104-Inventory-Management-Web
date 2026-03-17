import { useEffect, useMemo, useState, FormEvent, ChangeEvent } from 'react'
import './App.css'

const STORAGE_USERS = 'auth_users'
const STORAGE_AUTH = 'auth_current_user'

interface User {
  email: string
  name: string
}

interface Users {
  [email: string]: {
    email: string
    name: string
    password: string
  }
}

const loadUsers = (): Users => {
  try {
    const raw = localStorage.getItem(STORAGE_USERS)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

const saveUsers = (users: Users): void => {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users))
}

const loadCurrentUser = (): User | null => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_AUTH) ?? 'null')
  } catch {
    return null
  }
}

const saveCurrentUser = (user: User): void => {
  localStorage.setItem(STORAGE_AUTH, JSON.stringify(user))
}

const clearCurrentUser = (): void => {
  localStorage.removeItem(STORAGE_AUTH)
}

function App() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const saved = loadCurrentUser()
    if (saved) setUser(saved)
  }, [])

  const users = useMemo(() => loadUsers(), [user])

  const resetMessages = (): void => {
    setError('')
    setSuccess('')
  }

  const clearForm = (): void => {
    setEmail('')
    setName('')
    setPassword('')
    setConfirmPassword('')
    resetMessages()
  }

  const switchMode = (nextMode: 'login' | 'register'): void => {
    setMode(nextMode)
    clearForm()
  }

  const handleRegister = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    resetMessages()

    if (!email.trim() || !password.trim() || !name.trim()) {
      setError('Vui lòng điền đầy đủ thông tin.')
      return
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.')
      return
    }

    if (users[email]) {
      setError('Email này đã được đăng ký.')
      return
    }

    const nextUsers: Users = { ...users, [email]: { email, name, password } }
    saveUsers(nextUsers)

    setSuccess('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.')
    clearForm()
    setMode('login')
  }

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    resetMessages()

    if (!email.trim() || !password.trim()) {
      setError('Vui lòng điền email và mật khẩu.')
      return
    }

    const found = users[email]
    if (!found || found.password !== password) {
      setError('Email hoặc mật khẩu không đúng.')
      return
    }

    const currentUser: User = { email: found.email, name: found.name }
    setUser(currentUser)
    saveCurrentUser(currentUser)
    setSuccess('Đăng nhập thành công!')
    clearForm()
  }

  const handleLogout = (): void => {
    clearCurrentUser()
    setUser(null)
    setSuccess('Bạn đã đăng xuất.')
  }

  if (user) {
    return (
      <main className="auth-root">
        <section className="auth-card">
          <h1>Xin chào, {user.name}!</h1>
          <p>Bạn đã đăng nhập bằng email <strong>{user.email}</strong>.</p>
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
            {mode === 'login'
              ? 'Chưa có tài khoản?'
              : 'Đã có tài khoản?'}
            {' '}
            <button className="link" onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Đăng ký' : 'Đăng nhập'}
            </button>
          </p>
        </header>

        <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="auth-form">
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

          {mode === 'register' && (
            <label>
              Họ và tên
              <input
                type="text"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                required
                placeholder="Nguyen Van A"
              />
            </label>
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

          <button type="submit" className="primary">
            {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
