'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  role: string
  fullName: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      // In a real app, you'd validate the token with your backend
      setUser({
        id: '1',
        email: 'admin@centralhospital.com',
        role: 'ADMIN',
        fullName: 'System Administrator'
      })
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call - replace with actual API
      if (email === 'admin@centralhospital.com' && password === 'password123') {
        const userData = {
          id: '1',
          email,
          role: 'ADMIN',
          fullName: 'System Administrator'
        }
        localStorage.setItem('authToken', 'demo-token')
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        router.push('/dashboard')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}