"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"

export interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => boolean
  signup: (name: string, email: string, phone: string, password: string) => boolean
  logout: () => void
  showAuthModal: boolean
  setShowAuthModal: (show: boolean) => void
  authRedirectAction: string | null
  setAuthRedirectAction: (action: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authRedirectAction, setAuthRedirectAction] = useState<string | null>(null)

  const login = useCallback((email: string, _password: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0],
      email,
      phone: "",
    }
    setUser(newUser)
    setShowAuthModal(false)
    return true
  }, [])

  const signup = useCallback(
    (name: string, email: string, phone: string, _password: string) => {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone,
      }
      setUser(newUser)
      setShowAuthModal(false)
      return true
    },
    []
  )

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
        showAuthModal,
        setShowAuthModal,
        authRedirectAction,
        setAuthRedirectAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
