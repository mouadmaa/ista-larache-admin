import { useState } from 'react'
import { message } from 'antd'

import { User, useRegisterMutation, useUsersQuery, useDeleteUserMutation } from '../generated/graphql'

export const useUser = () => {
  const [formVisible, setFormVisible] = useState(false)

  const { data: usersData, loading: usersLoading } = useUsersQuery()

  const [register, { loading: registerLoading }] = useRegisterMutation({
    onCompleted: () => {
      message.success({ key: 'register', content: 'A new teacher has been added successfully.' })
      setFormVisible(false)
    },
    onError: () => {
      message.warning({ key: 'register', content: 'Maybe the email of teacher already exists.', duration: 10 })
    },
    update: (cache) => {
      cache.evict({ fieldName: 'users' })
    },
  })

  const [deleteUser, { loading: loadingDelete }] = useDeleteUserMutation({
    onCompleted: () => {
      message.success({ key: 'deleteUser', content: 'The teacher has been deleted successfully.' })
    },
    update: (cache, { data }) => {
      if (data?.deleteUser) cache.evict({ id: cache.identify(data.deleteUser) })
    },
  })

  return {
    users: usersData?.users as User[] || [],
    teachers: usersData?.users.filter(user => user.role === 'TEACHER') || [],
    usersLoading: usersLoading || loadingDelete,
    formLoading: registerLoading,
    register,
    deleteUser,
    formVisible,
    setFormVisible
  }
}
