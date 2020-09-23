import React, { createContext } from 'react'

import { AuthHook, useAuth } from '../hooks/useAuthHook'

const AuthContext = createContext<AuthHook>({
  user: undefined,
  loading: true,
  login: () => { },
  logout: () => { },
})

export default AuthContext

export const AuthProvider: React.FC = ({ children }) => {
  const { user, loading, login, logout } = useAuth()

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
