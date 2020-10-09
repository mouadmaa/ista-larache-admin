import { useState } from 'react'
import { message } from 'antd'

import {
  Activity, useActivitiesQuery, useCreateActivityMutation, useDeleteActivityMutation, useUpdateActivityMutation
} from '../generated/graphql'

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

  const [updateActivity, { loading: loadingUpdate }] = useUpdateActivityMutation({
    onCompleted: () => {
      message.success({ key: 'updateActivity', content: 'The activity has been edited successfully.' })
      setFormVisible(false)
    },
    onError: () => {
      message.warning({ key: 'updateActivity', content: 'Maybe the title of activity already exists.', duration: 10 })
    },
  })

  const [deleteActivity, { loading: loadingDelete }] = useDeleteActivityMutation({
    onCompleted: () => {
      message.success({ key: 'deleteActivity', content: 'The activity has been removed successfully.' })
    },
    update: (cache, { data }) => {
      if (data?.deleteActivity) cache.evict({ id: cache.identify(data.deleteActivity) })
    },
  })

  return {
    activities: activitiesData?.activities?.activities as Activity[] || [],
    activitiesLoading: activitiesLoading || loadingDelete,
    loadingForm: loadingCreate || loadingUpdate,
    createActivity,
    updateActivity,
    deleteActivity,
    formVisible,
    setFormVisible,
  }
}
