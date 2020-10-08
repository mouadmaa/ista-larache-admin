import { useState } from 'react'
import { message } from 'antd'

import { Activity, useActivitiesQuery, useCreateActivityMutation } from '../generated/graphql'

export const useActivity = () => {
  const [formVisible, setFormVisible] = useState(false)

  const { data: activitiesData, loading: activitiesLoading } = useActivitiesQuery()

  const [createActivity, { loading: loadingCreate }] = useCreateActivityMutation({
    onCompleted: () => {
      message.success({ key: 'createActivity', content: 'A new activity has been added successfully.' })
      setFormVisible(false)
    },
    onError: () => {
      message.warning({ key: 'createActivity', content: 'Maybe the title of activity already exists.', duration: 10 })
    },
    update: (cache) => {
      cache.evict({ fieldName: 'activities' })
    },
  })

  return {
    activities: activitiesData?.activities as Activity[] || [],
    activitiesLoading,
    loadingForm: loadingCreate,
    createActivity,
    formVisible,
    setFormVisible,
  }
}
