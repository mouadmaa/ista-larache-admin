import { useState, useCallback, useEffect } from 'react'

import { User } from '../generated/graphql'
import { setAccessToken } from '../apollo/apolloClient'

export interface AuthHook {
  user?: User
  loading: boolean
  login(user: User, accessToken: string): void
  logout(): void
}

interface RefreshTokenResponse {
  success: boolean
  user: User
  accessToken: string
}

export const useAuth = (): AuthHook => {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)

  const login = useCallback((user: User, accessToken: string) => {
    setUser(user)
    setAccessToken(accessToken)
  }, [])

  const logout = useCallback(() => {
    setUser(undefined)
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const refreshToken = await (await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/refresh_token`,
          {
            method: 'POST',
            credentials: 'include'
          }
        )).json() as RefreshTokenResponse

        if (refreshToken.success) {
          setAccessToken(refreshToken.accessToken)
          setUser(refreshToken.user)
        }

        setLoading(false)
      } catch {
        setLoading(false)
      }
    })()
  }, [])

  return { user, login, loading, logout, }
}
