import { message } from 'antd'
import React, { FC, Fragment, useState } from 'react'
import NoteForm from '../../components/Note/NoteForm/NoteForm'

import './Note.css'
import NoteTable from '../../components/Note/NoteTable/NoteTable'
import { Student, Note as NoteType, Module } from '../../generated/graphql'
import { useNote } from '../../hooks/useNote'

interface NoteProps {
  notes: NoteType[]
  loadingNotes: boolean
  student?: Student
  modules: Module[]
  loadingModules: boolean
  viewNote: boolean
}

const Note: FC<NoteProps> = props => {
  const { notes, loadingNotes, student, modules, loadingModules, viewNote } = props

  const [note, setNote] = useState<NoteType>()

  const {
    formVisible, setFormVisible, loadingTable, loadingForm,
    createNote, updateNote, deleteNote
  } = useNote()

  const onShowForm = () => {
    setFormVisible(true)
    setNote(undefined)
  }

  const onEdit = (note: NoteType) => {
    setFormVisible(true)
    setNote({ ...note })
  }

  const onDelete = (note: NoteType) => {
    setNote(undefined)
    deleteNote({ variables: { id: note.id } })
    message.loading({ key: 'deleteNote', content: 'Loading...' })
  }

  const onHideForm = () => setFormVisible(false)

  return (
    <Fragment>
      {student && viewNote && (
        <NoteForm
          note={note}
          notes={notes}
          student={student}
          modules={modules}
          visible={formVisible}
          loading={loadingForm}
          onCreate={createNote}
          onUpdate={updateNote}
          onShowForm={onShowForm}
          onHideForm={onHideForm}
        />
      )}
      <NoteTable
        notes={notes}
        viewNote={viewNote}
        loading={loadingNotes || loadingModules || loadingTable}
        student={student}
        modules={modules}
        onShowForm={onShowForm}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Fragment>
  )
}

export default Note
