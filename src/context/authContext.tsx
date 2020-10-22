import React, { createContext } from 'react'

import { AuthHook, useAuth } from '../hooks/useAuthHook'

export const AuthContext = createContext<AuthHook>({
  user: undefined,
  loading: true,
  login: () => { },
  logout: () => { },
})

export const AuthProvider: React.FC = ({ children }) => {
  const {
    user, loading, login, logout
  } = useAuth()

  return (
    <AuthContext.Provider
      value={{
        user, loading, login, logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
