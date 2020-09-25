import { useState } from 'react'
import { message } from 'antd'

import { useCreateModuleMutation, useDeleteModuleMutation, useUpdateModuleMutation } from '../generated/graphql'

export const useModule = () => {
  const [formVisible, setFormVisible] = useState(false)

  const [createModule, { loading: loadingCreate }] = useCreateModuleMutation({
    onCompleted: () => {
      message.success('A new module has been added successfully.')
      setFormVisible(false)
    },
    onError: () => {
      message.warning('Maybe the number of module already exists.', 10)
    },
    update: (cache) => {
      cache.evict({ fieldName: 'formation' })
    },
  })

  const [updateModule, { loading: loadingUpdate }] = useUpdateModuleMutation({
    onCompleted: () => {
      message.success('The module has been edited successfully.')
      setFormVisible(false)
    },
    onError: () => {
      message.warning('Maybe the number of module already exists.', 10)
    },
  })

  const [deleteModule, { loading: loadingDelete }] = useDeleteModuleMutation({
    onCompleted: () => {
      message.success('The module has been removed successfully.')
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
