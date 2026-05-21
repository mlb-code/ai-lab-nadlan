import { createContext, useContext, useState, useEffect } from 'react'
import { AUTH_ENDPOINT, STORAGE_KEY } from '../config/auth.js'

const AuthContext = createContext(null)

function normalizeUser(raw) {
  if (!raw || !raw.email) return null
  return {
    email: String(raw.email).toLowerCase(),
    name: raw.name || String(raw.email).split('@')[0],
    role: raw.role || 'student',
    isAdmin: raw.role === 'admin' || raw.role === 'instructor',
    level: String(raw.level || 'basic').toLowerCase(),
    group: String(raw.group || '').toLowerCase(),
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {}
    setLoading(false)
  }, [])

  const login = async (email) => {
    const clean = String(email || '').trim().toLowerCase()
    if (!clean.includes('@')) {
      return { ok: false, error: 'נא להזין כתובת מייל תקינה.' }
    }
    if (!AUTH_ENDPOINT) {
      return { ok: false, error: 'שירות ההתחברות אינו מוגדר. צור קשר עם המרצה.' }
    }
    try {
      const url = `${AUTH_ENDPOINT}?email=${encodeURIComponent(clean)}`
      const res = await fetch(url, { method: 'GET' })
      if (!res.ok) return { ok: false, error: 'שגיאת רשת. נסה שוב.' }
      const data = await res.json()
      if (!data.ok) {
        return { ok: false, error: data.error || 'המייל לא נמצא ברשימת הנרשמים.' }
      }
      const u = normalizeUser({ email: clean, ...data.user })
      setUser(u)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(u)) } catch {}
      return { ok: true }
    } catch (err) {
      return { ok: false, error: 'לא ניתן להתחבר לשרת ההרשמה.' }
    }
  }

  const logout = () => {
    setUser(null)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
