import React, { FC, useContext } from 'react'

import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import AuthContext from './context/authContext'
import Spinner from './components/UI/Spinner/Spinner'

const App: FC = () => {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <Spinner isPage />
    )
  }

  return user ? (
    <Dashboard />
  ) : (
      <Login />
  )
}

export default App
