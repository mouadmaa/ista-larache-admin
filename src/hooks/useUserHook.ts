import { User, useUsersQuery } from '../generated/graphql'

export const useUser = () => {

  const { data: usersData, loading: usersLoading } = useUsersQuery()

  return {
    users: usersData?.users as User[] || [],
    teachers: usersData?.users.filter(user => user.role === 'TEACHER') || [],
    usersLoading,
  }
}
