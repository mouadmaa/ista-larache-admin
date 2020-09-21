import { useState, useCallback, useEffect } from 'react'

import { useMeLazyQuery, User } from '../generated/graphql'

interface UserData {
  id: string
  name: string
  role: string
}

const useAuth = () => {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)

  const [fetchCurrentUser, { data: currentUser }] = useMeLazyQuery(
    { fetchPolicy: 'cache-and-network' }
  )

  const login = useCallback((user: User) => {
    setUser(user)
    setUserData(user)
    setLoading(false)
  }, [])

  const logout = useCallback(() => {
    setUser(undefined)
    removeUserData()
  }, [])

  useEffect(() => {
    (async () => {
      setLoading(false)

      const userData = getUserData()
      if (!userData) return

      fetchCurrentUser()
      if (currentUser?.me) {
        setUser(currentUser.me)
      } else {
        setUser({ ...userData, email: '', })
      }
    })()
  }, [currentUser, fetchCurrentUser])

  return { user, login, loading, logout, }
}

export default useAuth

const setUserData = (user: User) => {
  localStorage.setItem('userData',
    JSON.stringify({
      id: user.id,
      name: user.name,
      role: user.role,
    })
  )
}

const getUserData = () => {
  return JSON.parse(
    localStorage.getItem('userData') as string
  ) as UserData
}

const removeUserData = () => {
  localStorage.removeItem('userData')
}
