import React, { FC, Fragment, useState } from 'react'
import { message } from 'antd'

import './Activity.css'
import ActivityList from '../../components/Activity/ActivityList/ActivityList'
import ActivityForm from '../../components/Activity/ActivityForm/ActivityForm'
import { Activity as ActivityType } from '../../generated/graphql'
import { useActivity } from '../../hooks/useActivityHook'

const Activity: FC = () => {
  const [activity, setActivity] = useState<ActivityType>()

  const {
    activities, activitiesLoading, loadingForm, formVisible, setFormVisible,
    createActivity, updateActivity, deleteActivity
  } = useActivity()

  const onShowForm = (activity?: ActivityType) => {
    setFormVisible(true)
    setActivity(activity)
  }

  const onHideForm = () => setFormVisible(false)

  const onDelete = (activity: ActivityType) => {
    setActivity(undefined)
    deleteActivity({ variables: { id: activity.id } })
    message.loading({ key: 'deleteActivity', content: 'Loading...' })
  }

  return (
    <Fragment>
      {formVisible ? (
        <ActivityForm
          activity={activity}
          onHideForm={onHideForm}
          loading={loadingForm}
          onCreate={createActivity}
          onUpdate={updateActivity}
        />
      ) : (
        <ActivityList
          activities={activities}
          loading={activitiesLoading}
            onShowForm={onShowForm}
            onDelete={onDelete}
        />
        )}
    </Fragment>
  )
}

export default Activity
