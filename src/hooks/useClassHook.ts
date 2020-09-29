import { useState } from 'react'
import { message } from 'antd'

import { Class, useClassesQuery, useCreateClassMutation, useDeleteClassMutation, useUpdateClassMutation } from '../generated/graphql'

export const useClass = () => {
  const [formVisible, setFormVisible] = useState(false)

  const { data: classesData, loading: classesLoading } = useClassesQuery()

  const [createClass, { loading: createLoading }] = useCreateClassMutation({
    onCompleted: () => {
      message.success('A new class has been added successfully.')
      setFormVisible(false)
    },
    onError: () => {
      message.warning('Maybe the class already exists.', 10)
    },
    update: (cache) => {
      cache.evict({ fieldName: 'classes' })
    },
  })

  const [updateClass, { loading: loadingUpdate }] = useUpdateClassMutation({
    onCompleted: () => {
      message.success('The class has been edited successfully.')
      setFormVisible(false)
    },
    onError: () => {
      message.warning('Maybe the class already exists.', 10)
    },
  })

  const [deleteClass, { loading: deleteLoading }] = useDeleteClassMutation({
    onCompleted: () => {
      message.success('The class has been removed successfully.')
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
    formVisible,
    setFormVisible,
  }
}
