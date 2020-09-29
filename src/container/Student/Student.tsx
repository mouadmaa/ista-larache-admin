import React from 'react'

import './Student.css'
import { useFormation } from '../../hooks/useFormationHook'
import SelectClass from '../../components/Student/SelectClass/SelectClass'

const Student = () => {
  const {
    fetchFormationsWithClasses, formationsWithClasses, formationsWithClassesLoading
  } = useFormation()

  return (
    <div className='student-container'>
      <SelectClass
        fetchFormationsWithClasses={fetchFormationsWithClasses}
        formationsWithClasses={formationsWithClasses}
        loading={formationsWithClassesLoading}
      />
    </div>
  )
}

export default Student


