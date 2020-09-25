import { useState } from 'react'
import { message } from 'antd'

import { useCreateModuleMutation } from '../generated/graphql'

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

  return {
    createModule,
    loadingForm: loadingCreate,
    formVisible,
    setFormVisible,
  }
}
