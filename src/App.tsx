import React, { FC, useContext } from 'react'

import DashboardPage from './pages/Dashboard/DashboardPage'
import LoginPage from './pages/Login/LoginPage'
import AuthContext from './context/authContext'

const App: FC = () => {
  const { user, loading } = useContext(AuthContext)
  if (loading) return null

  return user ? (
    <DashboardPage />
  ) : (
      <LoginPage />
  )
}

export default App
