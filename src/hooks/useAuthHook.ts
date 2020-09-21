import { useState, useCallback, useEffect } from 'react'

import { useMeLazyQuery, User } from '../generated/graphql'

interface UserData {
  userId: string
}

const useAuth = () => {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)

  const [getCurrentUser, { data: currentUser }] = useMeLazyQuery()

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
      if (getUserData()) {
        getCurrentUser()
        if (currentUser?.me) {
          setUser(currentUser.me)
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    })()
  }, [currentUser, getCurrentUser])

  return { user, login, loading, logout, }
}

export default useAuth

const setUserData = (user: User) => {
  localStorage.setItem('userData',
    JSON.stringify({ userId: user.id })
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
