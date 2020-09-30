import { useState } from 'react'
import { message } from 'antd'

import { useCreateStudentMutation, useUpdateStudentMutation, useDeleteStudentMutation, useStudentWithNotesLazyQuery, Note } from '../generated/graphql'

export const useStudent = () => {
  const [formVisible, setFormVisible] = useState(false)

  const [
    fetchStudentWithNotes, { data: studentWithNotesData, loading: studentWithNotesLoading }
  ] = useStudentWithNotesLazyQuery()

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

  const [updateStudent, { loading: loadingUpdate }] = useUpdateStudentMutation({
    onCompleted: () => {
      message.success({ key: 'updateStudent', content: 'The student has been edited successfully.' })
      setFormVisible(false)
    },
    onError: () => {
      message.warning({ key: 'updateStudent', content: 'Maybe the cin or cef of student already exists.' })
    },
  })

  const [deleteStudent, { loading: loadingDelete }] = useDeleteStudentMutation({
    onCompleted: () => {
      message.success({ key: 'deleteStudent', content: 'The student has been removed successfully.' })
    },
    update: (cache, { data }) => {
      if (data?.deleteStudent) cache.evict({ id: cache.identify(data.deleteStudent) })
    },
  })

  return {
    formVisible,
    setFormVisible,
    loading: loadingDelete,
    loadingForm: loadingCreate || loadingUpdate,
    createStudent,
    updateStudent,
    deleteStudent,
    fetchStudentWithNotes,
    notes: studentWithNotesData?.student?.notes as Note[] || [],
    loadingModules: studentWithNotesLoading,
  }
}
