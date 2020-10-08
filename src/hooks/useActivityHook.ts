import { } from 'react'

import { Activity, useActivitiesQuery } from '../generated/graphql'

export const useActivity = () => {
  const { data: activitiesData, loading: activitiesLoading } = useActivitiesQuery()

  return {
    activities: activitiesData?.activities as Activity[] || [],
    activitiesLoading,
  }
}
