import React, { createContext } from 'react'
import { User } from '../generated/graphql'

import useAuth from '../hooks/useAuthHook'

interface Auth {
  user?: User,
  loading: boolean,
  login(user: User): void
  logout(): void
}

const AuthContext = createContext<Auth>({
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
