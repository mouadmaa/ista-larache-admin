import React, { FC, useState } from 'react'
import ClassForm from '../../components/Class/ClassForm/ClassForm'

import './Class.css'
import { Class as ClassType } from '../../generated/graphql'
import ClassTable from '../../components/Class/ClassTable/ClassTable'
import { useCLass } from '../../hooks/useClassHook'
import { useFormation } from '../../hooks/useFormationHook'
import { useUser } from '../../hooks/useUserHook'

const Class: FC = () => {
  const [currentClass, setCurrentClass] = useState<ClassType>()

  const {
    classes, classesLoading, formVisible, setFormVisible, formLoading,
    createClass,
  } = useCLass()
  const { formations, loadingFormations } = useFormation()
  const { teachers, usersLoading } = useUser()

  const onShowForm = () => {
    setFormVisible(true)
    setCurrentClass(undefined)
  }

  const onHideForm = () => setFormVisible(false)

  return (
    <div className='class-container'>
      <ClassForm
        class={currentClass}
        formations={formations}
        teachers={teachers}
        loading={formLoading || loadingFormations || usersLoading}
        visible={formVisible}
        onCreate={createClass}
        onShowForm={onShowForm}
        onHideForm={onHideForm}
      />
      <ClassTable
        classes={classes}
        loading={classesLoading}
      />
    </div>
  )
}

export default Class
