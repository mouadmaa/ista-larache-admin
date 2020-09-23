import { useState } from 'react'
import { message } from 'antd'

import { Formation, FormationFragmentDoc, useCreateFormationMutation, useFormationsQuery, CreateFormationMutation, Exact, Level } from '../generated/graphql'
import { FetchResult, MutationFunctionOptions } from '@apollo/client'

export interface FormationHook {
  formations: Formation[]
  loadingFormations: boolean
  loadingForm: boolean
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  createFormation: (options?: MutationFunctionOptions<CreateFormationMutation, Exact<{
    name: string; descUrl: string; level: Level;
  }>> | undefined) => Promise<FetchResult<CreateFormationMutation, Record<string, any>, Record<string, any>>>
}

export const useFormation = (): FormationHook => {
  const [visible, setVisible] = useState(false)
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
      setVisible(false)
    },
  })

  return {
    formations: data?.formations || [],
    loadingFormations: loading,
    loadingForm: loadingCreate,
    createFormation,
    visible,
    setVisible,
  }
}
