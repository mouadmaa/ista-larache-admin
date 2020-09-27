import React, { FC, useState } from 'react'

import './Class.css'
import ClassForm from '../../components/Class/ClassForm/ClassForm'
import ClassTable from '../../components/Class/ClassTable/ClassTable'
import ClassDrawer from '../../components/Class/ClassDrawer/ClassDrawer'
import { Class as ClassType } from '../../generated/graphql'
import { useCLass } from '../../hooks/useClassHook'
import { useFormation } from '../../hooks/useFormationHook'
import { useUser } from '../../hooks/useUserHook'

const Class: FC = () => {
  const [currentClass, setCurrentClass] = useState<ClassType>()
  const [visibleDrawer, setVisibleDrawer] = useState(false)

  const {
    classes, classesLoading, formVisible, setFormVisible, formLoading,
    createClass, updateClass, deleteClass
  } = useCLass()
  const { formations, loadingFormations } = useFormation()
  const { teachers, usersLoading } = useUser()

  const onShowForm = () => {
    setFormVisible(true)
    setCurrentClass(undefined)
  }

  const onShowDrawer = (viewClass: ClassType) => {
    setCurrentClass(viewClass)
    setVisibleDrawer(true)
  }

  const onEdit = (updatedClass: ClassType) => {
    setFormVisible(true)
    setCurrentClass(updatedClass)
  }

  const onDelete = (deletedClass: ClassType) => {
    deleteClass({ variables: { id: deletedClass.id } })
    setCurrentClass(undefined)
  }

  const onHideForm = () => setFormVisible(false)
  const onCloseDrawer = () => setVisibleDrawer(false)

  return (
    <div className='class-container'>
      <ClassForm
        currentClass={currentClass}
        formations={formations}
        teachers={teachers}
        loading={formLoading || loadingFormations || usersLoading}
        visible={formVisible}
        onCreate={createClass}
        onUpdate={updateClass}
        onShowForm={onShowForm}
        onHideForm={onHideForm}
      />
      <ClassTable
        classes={classes.concat(classes, classes, classes, classes, classes)}
        loading={classesLoading}
        onShowDrawer={onShowDrawer}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <ClassDrawer
        currentClass={currentClass}
        visibleDrawer={visibleDrawer}
        onCloseDrawer={onCloseDrawer}
      />
    </div>
  )
}

export default Class
