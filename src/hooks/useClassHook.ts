import { useState } from 'react'
import { message } from 'antd'

import { Class, useClassesQuery, useCreateClassMutation } from '../generated/graphql'

export const useCLass = () => {
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

  return {
    classes: classesData?.classes as Class[] || [],
    classesLoading,
    formLoading: createLoading,
    createClass,
    formVisible,
    setFormVisible,
  }
}
