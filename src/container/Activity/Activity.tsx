import React, { FC, Fragment } from 'react'
import ActivityList from '../../components/Activity/ActivityList'

import { useActivity } from '../../hooks/useActivityHook'

const Activity: FC = () => {
  const { activities, activitiesLoading } = useActivity()

  return (
    <Fragment>
      <ActivityList
        activities={activities}
        loading={activitiesLoading}
      />
    </Fragment>
  )
}

export default Activity
