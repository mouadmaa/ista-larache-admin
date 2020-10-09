import React, { useEffect, useState } from 'react'
import { message } from 'antd'

import './Student.css'
import SelectClass from '../../components/Class/SelectClass/SelectClass'
import StudentTable from '../../components/Student/StudentTable/StudentTable'
import { useFormation } from '../../hooks/useFormationHook'
import { useClass } from '../../hooks/useClassHook'
import { Student as StudentType } from '../../generated/graphql'
import StudentForm from '../../components/Student/StudentForm/StudentForm'
import { useStudent } from '../../hooks/useStudentHook'
import StudentDrawer from '../../components/Student/StudentDrawer/StudentDrawer'
import Note from '../Note/Note'
import StudentNoteFinal from '../../components/Student/StudentNoteFinal/StudentNoteFinal'

const Student = () => {
  const [students, setStudents] = useState<StudentType[]>([])
  const [student, setStudent] = useState<StudentType>()
  const [formationId, setFormationId] = useState<string>('')
  const [classId, setClassId] = useState<string>()
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [viewNote, setViewNote] = useState(false)

  const {
    createStudent, loadingForm, formVisible, setFormVisible, loading,
    deleteStudent, updateStudent, fetchStudentWithNotes, notes, loadingNotes
  } = useStudent()
  const {
    fetchFormationsWithClasses, formationsWithClasses, formationsWithClassesLoading,
    fetchFormationWithModules, modules, loadingModules
  } = useFormation()
  const {
    fetchClassWithStudents, classWithStudents, classWithStudentsLoading
  } = useClass()

  useEffect(() => {
    if (classWithStudents?.students) setStudents(classWithStudents.students)
  }, [classWithStudents])

  const onSelectClass = (formationId?: string, classId?: string) => {
    if (classId) fetchClassWithStudents({ variables: { id: classId } })
    if (formationId) setFormationId(formationId)
    setClassId(classId)
    setStudent(undefined)
    setViewNote(false)
    setStudents([])
  }

  const onShowForm = () => {
    setFormVisible(true)
    setStudent(undefined)
    setViewNote(false)
  }

  const onShowDrawer = (student: StudentType) => {
    setVisibleDrawer(true)
    setStudent(student)
  }

  const onEdit = (selectedStudent: StudentType) => {
    setFormVisible(true)
    setStudent({ ...selectedStudent })
    if (student?.id !== selectedStudent.id) setViewNote(false)
  }

  const onDelete = (student: StudentType) => {
    setStudent(undefined)
    deleteStudent({ variables: { id: student.id } })
    message.loading({ key: 'deleteStudent', content: 'Loading...' })
  }

  const onShowNotes = (student: StudentType) => {
    setViewNote(true)
    setStudent(student)
    fetchStudentWithNotes({ variables: { id: student.id } })
    fetchFormationWithModules({ variables: { id: formationId } })
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
      {classWithStudents && classId && (
        <StudentForm
          student={student}
          currentClass={classWithStudents}
          onCreate={createStudent}
          onUpdate={updateStudent}
          onHideForm={onHideForm}
          visible={formVisible}
          loading={loadingForm}
        />
      )}
      <StudentTable
        students={students}
        loading={loading || classWithStudentsLoading}
        onShowForm={onShowForm}
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
      {student && viewNote && (
        <StudentNoteFinal
          student={student}
          loading={loadingForm}
          currentClass={classWithStudents}
          onUpdate={updateStudent}
        />
      )}
      <Note
        notes={notes}
        viewNote={viewNote}
        loadingNotes={loadingNotes}
        student={student}
        modules={modules}
        loadingModules={loadingModules}
      />
    </div>
  )
}

export default Student
