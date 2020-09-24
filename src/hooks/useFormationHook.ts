import { useState } from 'react'
import { message } from 'antd'

import {
  Formation, useCreateFormationMutation, useFormationsQuery,
  useDeleteFormationMutation, useUpdateFormationMutation,
} from '../generated/graphql'

export const useFormation = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [formation, setFormation] = useState<Formation>()
  const { data, loading } = useFormationsQuery()

  const [createFormation, { loading: loadingCreate }] = useCreateFormationMutation({
    onCompleted: () => {
      message.success('A new formation has been added successfully.')
      setFormVisible(false)
    },
    update: (cache) => {
      cache.evict({ fieldName: 'formations' })
    },
  })

  const [updateFormation, { loading: loadingUpdate }] = useUpdateFormationMutation({
    onCompleted: () => {
      message.success('The formation has been edited successfully.')
      setFormVisible(false)
    },
  })

  const [deleteFormation, { loading: loadingDelete }] = useDeleteFormationMutation({
    onCompleted: () => {
      message.success('The formation has been removed successfully.')
    },
    update: (cache, { data }) => {
      if (data?.deleteFormation) cache.evict({ id: cache.identify(data.deleteFormation) })
    },
  })

  return {
    formations: data?.formations || [],
    formation,
    setFormation,
    loadingFormations: loading || loadingDelete,
    loadingForm: loadingCreate || loadingUpdate,
    createFormation,
    updateFormation,
    deleteFormation,
    formVisible,
    setFormVisible,
  }
}
