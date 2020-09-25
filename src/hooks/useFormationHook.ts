import { useState } from 'react'
import { message } from 'antd'

import {
  Formation, useCreateFormationMutation, useFormationsQuery, useDeleteFormationMutation,
  useUpdateFormationMutation, useFormationLazyQuery, Module
} from '../generated/graphql'

export const useFormation = () => {
  const [formVisible, setFormVisible] = useState(false)

  const { data: formationsData, loading: formationsLoading } = useFormationsQuery()
  const [fetchFormationWithModules, { data: formationDataWithModules, loading: formationLoadingWithModules }] = useFormationLazyQuery()

  const [createFormation, { loading: loadingCreate }] = useCreateFormationMutation({
    onCompleted: () => {
      message.success('A new formation has been added successfully.')
      setFormVisible(false)
    },
    onError: () => {
      message.warning('Maybe the name of formation already exists.', 10)
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
    onError: () => {
      message.warning('Maybe the name of formation already exists.', 10)
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
    formations: formationsData?.formations as Formation[] || [],
    loadingFormations: formationsLoading || loadingDelete,
    loadingForm: loadingCreate || loadingUpdate,
    createFormation,
    updateFormation,
    deleteFormation,
    fetchFormationWithModules,
    modules: formationDataWithModules?.formation?.modules as Module[] || [],
    loadingModules: formationLoadingWithModules,
    formVisible,
    setFormVisible,
  }
}
