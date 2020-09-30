import React, { FC, Fragment } from 'react'

import NoteTable from '../../components/Note/NoteTable/NoteTable'
import { Student, Note as NoteType } from '../../generated/graphql'

interface NoteProps {
  notes: NoteType[]
  loading: boolean
  student?: Student
}

const Note: FC<NoteProps> = props => {
  const { notes, loading, student } = props

  // const [note, setNote] = useState<NoteType>()

  // const {
  //   formVisible, setFormVisible, loadingTable,
  // } = useNote()

  // const onShowForm = () => {
  //   setFormVisible(true)
  //   setNote(undefined)
  // }

  // const onEdit = (note: NoteType) => {
  //   setFormVisible(true)
  //   setNote({ ...note })
  // }

  // const onDelete = (note: NoteType) => {
  //   deleteNote({ variables: { id: note.id } })
  //   setNote(undefined)
  // }

  // const onHideForm = () => setFormVisible(false)

  return (
    <Fragment>
      {/* {student && (
        <NoteForm
          note={note}
          student={student}
          visible={formVisible}
          loading={loadingForm}
          onCreate={createNote}
          onUpdate={updateNote}
          onShowForm={onShowForm}
          onHideForm={onHideForm}
        />
      )} */}
      <NoteTable
        notes={student ? notes : []}
        loading={loading /*|| loadingTable*/}
        student={student}
      // onEdit={onEdit}
      // onDelete={onDelete}
      />
    </Fragment>
  )
}

export default Note
