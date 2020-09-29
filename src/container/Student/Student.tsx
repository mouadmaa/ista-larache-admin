import React, { useEffect, useState } from 'react'
import { message } from 'antd'

import './Student.css'
import SelectClass from '../../components/Student/SelectClass/SelectClass'
import StudentTable from '../../components/Student/StudentTable/StudentTable'
import { useFormation } from '../../hooks/useFormationHook'
import { useClass } from '../../hooks/useClassHook'
import { Student as StudentType } from '../../generated/graphql'

const Student = () => {
  const [students, setStudents] = useState<StudentType[]>([])

  const {
    fetchFormationsWithClasses, formationsWithClasses, formationsWithClassesLoading
  } = useFormation()
  const {
    fetchClassClassWithStudents, classWithStudents, classWithStudentsLoading
  } = useClass()

  useEffect(() => {
    if (classWithStudents?.students) setStudents(classWithStudents.students)
  }, [classWithStudents])

  const onSelectClass = (formationId: string | undefined, classId: string | undefined) => {
    if (classId) fetchClassClassWithStudents({ variables: { id: classId } })
    else if (formationId && !classId) message.info('This formation does not have any classes.')
    setStudents([])
  }

  return (
    <div className='student-container'>
      <SelectClass
        fetchFormationsWithClasses={fetchFormationsWithClasses}
        formationsWithClasses={formationsWithClasses}
        loading={formationsWithClassesLoading}
        onSelect={onSelectClass}
      />
      <StudentTable
        currentClass={classWithStudents}
        students={students}
        loading={classWithStudentsLoading}
      />
    </div>
  )
}

export default Student
