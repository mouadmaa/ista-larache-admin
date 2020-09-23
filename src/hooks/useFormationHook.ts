import { useState } from 'react'
import { message } from 'antd'
import { FetchResult, MutationFunctionOptions } from '@apollo/client'

import {
  Formation, useCreateFormationMutation, useFormationsQuery, Exact, Level, CreateFormationMutation,
  useDeleteFormationMutation, DeleteFormationMutation, useUpdateFormationMutation, UpdateFormationMutation
} from '../generated/graphql'

export interface FormationHook {
  formations: Formation[]
  formation: Formation | undefined
  setFormation: React.Dispatch<React.SetStateAction<Formation | undefined>>
  loadingFormations: boolean
  loadingForm: boolean
  formVisible: boolean
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>
  createFormation: (options?: MutationFunctionOptions<CreateFormationMutation, Exact<{
    name: string; descUrl: string; level: Level;
  }>> | undefined) => Promise<FetchResult<CreateFormationMutation, Record<string, any>, Record<string, any>>>
  updateFormation: (options?: MutationFunctionOptions<UpdateFormationMutation, Exact<{
    id: string; name?: string | null | undefined; descUrl?: string | null | undefined; level?: Level | null | undefined;
  }>> | undefined) => Promise<FetchResult<UpdateFormationMutation, Record<string, any>, Record<string, any>>>
  deleteFormation: (options?: MutationFunctionOptions<DeleteFormationMutation, Exact<{
    id: string;
  }>> | undefined) => Promise<FetchResult<DeleteFormationMutation, Record<string, any>, Record<string, any>>>
}

export const useFormation = (): FormationHook => {
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
