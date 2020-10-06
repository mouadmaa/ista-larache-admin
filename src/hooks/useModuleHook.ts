import { useState } from 'react'
import { message } from 'antd'

import { useCreateModuleMutation, useDeleteModuleMutation, useUpdateModuleMutation } from '../generated/graphql'

export const useModule = () => {
  const [formVisible, setFormVisible] = useState(false)

  const [createModule, { loading: loadingCreate }] = useCreateModuleMutation({
    onCompleted: () => {
      message.success({ key: 'createModule', content: 'A new module has been added successfully.' })
      setFormVisible(false)
    },
    onError: () => {
      message.warning({ key: 'createModule', content: 'Maybe the number of module already exists.', duration: 10 })
    },
    update: (cache) => {
      cache.evict({ fieldName: 'formation' })
    },
  })

  const [updateModule, { loading: loadingUpdate }] = useUpdateModuleMutation({
    onCompleted: () => {
      message.success({ key: 'updateModule', content: 'The module has been edited successfully.' })
      setFormVisible(false)
    },
    onError: () => {
      message.warning({ key: 'updateModule', content: 'Maybe the number or name of module already exists.', duration: 10 })
    },
  })

  const [deleteModule, { loading: loadingDelete }] = useDeleteModuleMutation({
    onCompleted: () => {
      message.success({ key: 'deleteModule', content: 'The module has been removed successfully.' })
    },
    update: (cache, { data }) => {
      if (data?.deleteModule) cache.evict({ id: cache.identify(data.deleteModule) })
    },
  })

  return {
    createModule,
    deleteModule,
    updateModule,
    loadingForm: loadingCreate || loadingUpdate,
    loadingTable: loadingDelete,
    formVisible,
    setFormVisible,
  }
}
