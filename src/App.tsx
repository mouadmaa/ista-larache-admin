import React, { FC, useContext } from 'react'

import DashboardPage from './pages/Dashboard/Dashboard'
import LoginPage from './pages/Login/Login'
import AuthContext from './context/authContext'
import Spinner from './components/UI/Spinner/Spinner'

const App: FC = () => {
  const { user, loading } = useContext(AuthContext)
  if (loading) {
    return (
      <Spinner />
    )
  }

  return user ? (
    <DashboardPage />
  ) : (
      <LoginPage />
  )
}

export default App
