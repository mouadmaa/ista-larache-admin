import React, { FC, Fragment } from 'react'
import { message } from 'antd'

import './Teacher.css'
import TeacherTable from '../../components/Teacher/TeacherTable/TeacherTable'
import TeacherForm from '../../components/Teacher/TeacherForm/TeacherForm'
import { User as TeacherType } from '../../generated/graphql'
import { useUser } from '../../hooks/useUserHook'

const Teacher: FC = () => {
  const {
    teachers, usersLoading, formLoading, formVisible, setFormVisible,
    register, deleteUser
  } = useUser()

  const onShowForm = () => setFormVisible(true)
  const onHideForm = () => setFormVisible(false)

  const onDelete = (teacher: TeacherType) => {
    deleteUser({ variables: { id: teacher.id } })
    message.loading({ key: 'deleteUser', content: 'Loading...' })
  }

  return (
    <Fragment>
      <TeacherForm
        register={register}
        loading={formLoading}
        visible={formVisible}
        onHideForm={onHideForm}
      />
      <TeacherTable
        teachers={teachers}
        loading={usersLoading}
        onShowForm={onShowForm}
        onDelete={onDelete}
      />
    </Fragment>
  )
}

export default Teacher
