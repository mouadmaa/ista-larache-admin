import { useState } from 'react'
import { message } from 'antd'

import { Class, useClassesQuery, useClassWithStudentsLazyQuery, useCreateClassMutation, useDeleteClassMutation, useUpdateClassMutation } from '../generated/graphql'

export const useClass = () => {
  const [formVisible, setFormVisible] = useState(false)

  const { data: classesData, loading: classesLoading } = useClassesQuery()
  const [
    fetchClassClassWithStudents, { data: classWithStudentsData, loading: classWithStudentsLoading }
  ] = useClassWithStudentsLazyQuery()

  const [createClass, { loading: createLoading }] = useCreateClassMutation({
    onCompleted: () => {
      message.success({ key: 'createClass', content: 'A new class has been added successfully.' })
      setFormVisible(false)
    },
    onError: () => {
      message.warning({ key: 'createClass', content: 'Maybe the class already exists.', duration: 10 })
    },
    update: (cache) => {
      cache.evict({ fieldName: 'classes' })
    },
  })

  const [updateClass, { loading: loadingUpdate }] = useUpdateClassMutation({
    onCompleted: () => {
      message.success({ key: 'updateClass', content: 'The class has been edited successfully.' })
      setFormVisible(false)
    },
    onError: () => {
      message.warning({ key: 'updateClass', content: 'Maybe the class already exists.', duration: 10 })
    },
  })

  const [deleteClass, { loading: deleteLoading }] = useDeleteClassMutation({
    onCompleted: () => {
      message.success({ key: 'deleteClass', content: 'The class has been removed successfully.' })
    },
    update: (cache, { data }) => {
      if (data?.deleteClass) cache.evict({ id: cache.identify(data.deleteClass) })
    },
  })

  return {
    classes: classesData?.classes as Class[] || [],
    classesLoading: classesLoading || deleteLoading,
    formLoading: createLoading || loadingUpdate,
    createClass,
    updateClass,
    deleteClass,
    fetchClassWithStudents: fetchClassClassWithStudents,
    classWithStudents: classWithStudentsData?.class as Class | undefined,
    classWithStudentsLoading,
    formVisible,
    setFormVisible,
  }
}
