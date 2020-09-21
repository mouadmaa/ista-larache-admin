import React, { FC, useContext } from 'react'

import DashboardPage from './pages/Dashboard/DashboardPage'
import LoginPage from './pages/Login/LoginPage'
import AuthContext from './context/authContext'
import Spinner from './components/UI/Spinner/SpinnerComponent'

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
