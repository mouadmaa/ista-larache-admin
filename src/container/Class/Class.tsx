import React, { FC, Fragment } from 'react'
import ClassTable from '../../components/Class/ClassTable/ClassTable'
import { useCLass } from '../../hooks/useClassHook'

const Class: FC = () => {
  const { classes, classesLoading } = useCLass()

  return (
    <Fragment>
      <ClassTable
        classes={classes}
        loading={classesLoading}
      />
    </Fragment>
  )
}

export default Class
