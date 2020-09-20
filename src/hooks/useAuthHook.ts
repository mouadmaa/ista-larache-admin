import { useState, useCallback, useEffect } from 'react'

import { useLogoutMutation, useMeLazyQuery, User } from '../generated/graphql'

interface UserData {
  userId: string
  role: 'TEACHER' | 'ADMIN'
}

const useAuth = () => {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)

  const [getUser, { data }] = useMeLazyQuery()
  const [logoutMutation, { client }] = useLogoutMutation()

  const login = useCallback((user: User) => {
    setUser(user)
    storeUserData(user)
    setLoading(false)
  }, [])

  const logout = useCallback(async () => {
    setUser(undefined)
    deleteUserData()
    await logoutMutation()
    await client.resetStore()
  }, [logoutMutation, client])

  const updateUser = useCallback((user: User) => {
    setUser(user)
  }, [])

  useEffect(() => {
    (async () => {
      if (getUserData()) {
        getUser()
        if (data?.me) {
          setUser(data.me)
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    })()
  }, [data, getUser])

  return { user, login, loading, logout, updateUser }
}

export default useAuth

const storeUserData = (user: User) => {
  localStorage.setItem('userData',
    JSON.stringify({ userId: user.id, role: user.role, })
  )
}

const getUserData = () => {
  return JSON.parse(
    localStorage.getItem('userData') as string
  ) as UserData
}

const deleteUserData = () => {
  localStorage.removeItem('userData')
}
