import { useState } from 'react'
import { message } from 'antd'
import { FetchResult, MutationFunctionOptions } from '@apollo/client'

import {
  Formation, FormationFragmentDoc, useCreateFormationMutation, useFormationsQuery,
  CreateFormationMutation, Exact, Level, useDeleteFormationMutation, DeleteFormationMutation
} from '../generated/graphql'

export interface FormationHook {
  formations: Formation[]
  loadingFormations: boolean
  loadingForm: boolean
  formVisible: boolean
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>
  createFormation: (options?: MutationFunctionOptions<CreateFormationMutation, Exact<{
    name: string; descUrl: string; level: Level;
  }>> | undefined) => Promise<FetchResult<CreateFormationMutation, Record<string, any>, Record<string, any>>>
  deleteFormation: (options?: MutationFunctionOptions<DeleteFormationMutation, Exact<{
    id: string;
  }>> | undefined) => Promise<FetchResult<DeleteFormationMutation, Record<string, any>, Record<string, any>>>
}

export const useFormation = (): FormationHook => {
  const [formVisible, setFormVisible] = useState(false)
  const { data, loading } = useFormationsQuery()

  const [createFormation, { loading: loadingCreate }] = useCreateFormationMutation({
    update: (cache, { data }) => {
      if (!data?.createFormation) return
      cache.modify({
        fields: {
          formations: (existingFormations = []) => {
            const newFormation = cache.writeFragment({
              data: data.createFormation,
              fragment: FormationFragmentDoc
            })
            return [newFormation, ...existingFormations]
          }
        }
      })
      message.success('A new formation has been added successfully')
      setFormVisible(false)
    },
  })

  const [deleteFormation, { loading: loadingDelete }] = useDeleteFormationMutation({
    update: (cache, { data }) => {
      if (!data?.deleteFormation) return
      cache.evict({ id: cache.identify(data.deleteFormation) })
      message.success('A new formation has been deleted successfully')
      setFormVisible(false)
    },
  })

  return {
    formations: data?.formations || [],
    loadingFormations: loading,
    loadingForm: loadingCreate || loadingDelete,
    createFormation,
    deleteFormation,
    formVisible,
    setFormVisible,
  }
}
