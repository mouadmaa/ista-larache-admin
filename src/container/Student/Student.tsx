import React, { useEffect, useState } from 'react'
import { message } from 'antd'

import './Student.css'
import SelectClass from '../../components/Student/SelectClass/SelectClass'
import StudentTable from '../../components/Student/StudentTable/StudentTable'
import { useFormation } from '../../hooks/useFormationHook'
import { useClass } from '../../hooks/useClassHook'
import { Student as StudentType } from '../../generated/graphql'
import StudentForm from '../../components/Student/StudentForm/StudentForm'
import { useStudent } from '../../hooks/useStudentHook'

const Student = () => {
  const [students, setStudents] = useState<StudentType[]>([])
  const [student, setStudent] = useState<StudentType>()

  const {
    createStudent, loadingForm, formVisible, setFormVisible
  } = useStudent()
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

  const onShowForm = () => {
    setFormVisible(true)
    setStudent(undefined)
  }

  const onHideForm = () => setFormVisible(false)

  return (
    <div className='student-container'>
      <SelectClass
        fetchFormationsWithClasses={fetchFormationsWithClasses}
        formationsWithClasses={formationsWithClasses}
        loading={formationsWithClassesLoading}
        onSelect={onSelectClass}
      />
      {classWithStudents && (
        <StudentForm
          student={student}
          currentClass={classWithStudents}
          onCreate={createStudent}
          onShowForm={onShowForm}
          onHideForm={onHideForm}
          visible={formVisible}
          loading={loadingForm}
        />
      )}
      <StudentTable
        currentClass={classWithStudents}
        students={students}
        loading={classWithStudentsLoading}
      />
    </div>
  )
}

export default Student
