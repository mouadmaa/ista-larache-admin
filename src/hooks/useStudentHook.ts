import { useState } from 'react'
import { message } from 'antd'

import { useCreateStudentMutation } from '../generated/graphql'

export const useStudent = () => {
  const [formVisible, setFormVisible] = useState(false)

  const [createStudent, { loading: loadingCreate }] = useCreateStudentMutation({
    onCompleted: () => {
      message.success({ key: 'createStudent', content: 'A new student has been added successfully.' })
      setFormVisible(false)
    },
    onError: () => {
      message.warning({ key: 'createStudent', content: 'Maybe the cin or cef of student already exists.' })
    },
    update: (cache) => {
      cache.evict({ fieldName: 'class' })
    },
  })

  return {
    formVisible,
    setFormVisible,
    createStudent,
    loadingForm: loadingCreate,
  }
}
