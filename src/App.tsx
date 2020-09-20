import React, { FC, Fragment, useContext } from 'react'

import DashboardPage from './pages/Dashboard/DashboardPage'
import LoginPage from './pages/Login/LoginPage'
import AuthContext from './context/authContext'

const App: FC = () => {
  const { user, loading } = useContext(AuthContext)

  return (
    <Fragment>
      {loading ? (
        <h3>Loading...</h3>
      ) : user ? (
        <DashboardPage />
      ) : (
        <LoginPage />
          )}
    </Fragment>
  )
}

export default App
