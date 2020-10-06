import { useState } from 'react'
import { message } from 'antd'

import {
  Formation, useCreateFormationMutation, useFormationsQuery, useDeleteFormationMutation,
  useUpdateFormationMutation, useFormationWithModulesLazyQuery, Module, useFormationsWithClassesLazyQuery
} from '../generated/graphql'

export const useFormation = () => {
  const [formVisible, setFormVisible] = useState(false)

  const { data: formationsData, loading: formationsLoading } = useFormationsQuery()
  const [
    fetchFormationWithModules, { data: formationWithModulesData, loading: formationWithModulesLoading }
  ] = useFormationWithModulesLazyQuery()
  const [
    fetchFormationsWithClasses, { data: formationsWithClassesData, loading: formationsWithClassesLoading }
  ] = useFormationsWithClassesLazyQuery()

  const [createFormation, { loading: loadingCreate }] = useCreateFormationMutation({
    onCompleted: () => {
      message.success({ key: 'createFormation', content: 'A new formation has been added successfully.' })
      setFormVisible(false)
    },
    onError: () => {
      message.warning({ key: 'createFormation', content: 'Maybe the name of formation already exists.', duration: 10 })
    },
    update: (cache) => {
      cache.evict({ fieldName: 'formations' })
    },
  })

  const [updateFormation, { loading: loadingUpdate }] = useUpdateFormationMutation({
    onCompleted: () => {
      message.success({ key: 'updateFormation', content: 'The formation has been edited successfully.' })
      setFormVisible(false)
    },
    onError: () => {
      message.warning({ key: 'updateFormation', content: 'Maybe the name of formation already exists.', duration: 10 })
    },
  })

  const [deleteFormation, { loading: loadingDelete }] = useDeleteFormationMutation({
    onCompleted: () => {
      message.success({ key: 'deleteFormation', content: 'The formation has been removed successfully.' })
    },
    update: (cache, { data }) => {
      if (data?.deleteFormation) cache.evict({ id: cache.identify(data.deleteFormation) })
    },
  })

  return {
    formations: formationsData?.formations as Formation[] || [],
    formationsLoading: formationsLoading || loadingDelete,
    formLoading: loadingCreate || loadingUpdate,
    createFormation,
    updateFormation,
    deleteFormation,
    fetchFormationWithModules,
    modules: formationWithModulesData?.formation?.modules as Module[] || [],
    loadingModules: formationWithModulesLoading,
    fetchFormationsWithClasses,
    formationsWithClasses: formationsWithClassesData?.formations as Formation[] || [],
    formationsWithClassesLoading,
    formVisible,
    setFormVisible,
  }
}
