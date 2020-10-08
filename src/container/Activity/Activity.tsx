import React, { FC, Fragment, useState } from 'react'

import './Activity.css'
import ActivityList from '../../components/Activity/ActivityList/ActivityList'
import { useActivity } from '../../hooks/useActivityHook'
import ActivityForm from '../../components/Activity/ActivityForm/ActivityForm'
import { Activity as ActivityType } from '../../generated/graphql'

const Activity: FC = () => {
  const [activity, setActivity] = useState<ActivityType>()

  const {
    activities, activitiesLoading, loadingForm, formVisible, setFormVisible,
    createActivity
  } = useActivity()

  const onShowForm = (activity?: ActivityType) => {
    setFormVisible(true)
    setActivity(activity)
  }

  const onHideForm = () => setFormVisible(false)

  return (
    <Fragment>
      {formVisible ? (
        <ActivityForm
          activity={activity}
          onHideForm={onHideForm}
          loading={loadingForm}
          onCreate={createActivity}
        />
      ) : (
        <ActivityList
          activities={activities}
          loading={activitiesLoading}
            onShowForm={onShowForm}
        />
        )}
    </Fragment>
  )
}

export default Activity
