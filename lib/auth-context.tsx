"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  _id?: string
  id?: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  createdAt?: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password?: string) => Promise<boolean>
  signup: (userData: Omit<User, "id" | "createdAt">) => Promise<boolean>
  socialLogin: (provider: string, userData: Partial<User>) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("hostly_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("hostly_user")
      }
    }
    setIsLoading(false)
  }, [])

  const signup = async (userData: Omit<User, "id" | "createdAt">): Promise<boolean> => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        const result = await response.json()
        const newUser = result.user
        setUser(newUser)
        localStorage.setItem("hostly_user", JSON.stringify(newUser))
        return true
      } else {
        const error = await response.json()
        console.error("Signup error:", error.error)
        return false
      }
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const login = async (email: string, password?: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        const result = await response.json()
        const foundUser = result.user
        setUser(foundUser)
        localStorage.setItem("hostly_user", JSON.stringify(foundUser))
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const socialLogin = async (provider: string, userData: Partial<User>): Promise<boolean> => {
    try {
      // For social login, create user if doesn't exist
      const signupData = {
        email: userData.email || `user@${provider}.com`,
        firstName: userData.firstName || "User",
        lastName: userData.lastName || "Name",
        phone: userData.phone,
        avatar: userData.avatar,
      }

      const success = await signup(signupData)
      return success
    } catch (error) {
      console.error("Social login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("hostly_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        socialLogin,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
