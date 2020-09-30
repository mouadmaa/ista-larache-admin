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
import StudentDrawer from '../../components/Student/StudentDrawer/StudentDrawer'
import Note from '../Note/Note'

const Student = () => {
  const [students, setStudents] = useState<StudentType[]>([])
  const [student, setStudent] = useState<StudentType>()
  const [visibleDrawer, setVisibleDrawer] = useState(false)

  const {
    createStudent, loadingForm, formVisible, setFormVisible, loading,
    deleteStudent, updateStudent, fetchStudentWithNotes, notes, loadingModules
  } = useStudent()
  const {
    fetchFormationsWithClasses, formationsWithClasses, formationsWithClassesLoading
  } = useFormation()
  const {
    fetchClassWithStudents, classWithStudents, classWithStudentsLoading
  } = useClass()

  useEffect(() => {
    if (classWithStudents?.students) setStudents(classWithStudents.students)
  }, [classWithStudents])

  const onSelectClass = (formationId: string | undefined, classId: string | undefined) => {
    if (classId) fetchClassWithStudents({ variables: { id: classId } })
    else if (formationId && !classId) message.info('This formation does not have any classes.')
    setStudents([])
  }

  const onShowForm = () => {
    setFormVisible(true)
    setStudent(undefined)
  }

  const onShowDrawer = (student: StudentType) => {
    setVisibleDrawer(true)
    setStudent(student)
  }

  const onEdit = (student: StudentType) => {
    setFormVisible(true)
    setStudent({ ...student })
  }

  const onDelete = (student: StudentType) => {
    setStudent(undefined)
    deleteStudent({ variables: { id: student.id } })
    message.loading({ key: 'deleteStudent', content: 'Loading...' })
  }

  const onShowNotes = (student: StudentType) => {
    setStudent(student)
    fetchStudentWithNotes({ variables: { id: student.id } })
  }

  const onHideForm = () => setFormVisible(false)
  const onCloseDrawer = () => setVisibleDrawer(false)

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
          onUpdate={updateStudent}
          onShowForm={onShowForm}
          onHideForm={onHideForm}
          visible={formVisible}
          loading={loadingForm}
        />
      )}
      <StudentTable
        currentClass={classWithStudents}
        students={students}
        loading={classWithStudentsLoading || loading}
        onShowDrawer={onShowDrawer}
        onEdit={onEdit}
        onDelete={onDelete}
        onShowNotes={onShowNotes}
      />
      <StudentDrawer
        student={student}
        currentClass={classWithStudents}
        formations={formationsWithClasses}
        visibleDrawer={visibleDrawer}
        onCloseDrawer={onCloseDrawer}
      />
      <Note
        notes={notes}
        loading={loadingModules}
        student={student}
      />
    </div>
  )
}

export default Student
