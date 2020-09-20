import React, { createContext } from 'react'
import { User } from '../generated/graphql'

import useAuth from '../hooks/useAuthHook'

interface Auth {
  user?: User,
  loading: boolean,
  login(user: User): void
  logout(): void
  updateUser(user: User): void
}

const AuthContext = createContext<Auth>({
  user: undefined,
  loading: true,
  login: () => { },
  logout: () => { },
  updateUser: () => { },
})

export default AuthContext

export const AuthProvider: React.FC = ({ children }) => {
  const { user, loading, login, logout, updateUser } = useAuth()
  console.log(user, loading)

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, updateUser, }}
    >
      {children}
    </AuthContext.Provider>
  )
}
