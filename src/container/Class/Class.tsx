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
    createClass, updateClass, deleteClass
  } = useCLass()
  const { formations, loadingFormations } = useFormation()
  const { teachers, usersLoading } = useUser()

  const onShowForm = () => {
    setFormVisible(true)
    setCurrentClass(undefined)
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

  return (
    <div className='class-container'>
      <ClassForm
        class={currentClass}
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
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  )
}

export default Class
