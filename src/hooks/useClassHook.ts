import { } from 'react'

import { Class, useClassesQuery } from '../generated/graphql'

export const useCLass = () => {

  const { data: classesData, loading: classesLoading } = useClassesQuery()

  return {
    classes: classesData?.classes as Class[] || [],
    classesLoading,
  }
}
