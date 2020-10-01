import { message } from 'antd'
import { useState } from 'react'

import { useCreateNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } from '../generated/graphql'

export const useNote = () => {
  const [formVisible, setFormVisible] = useState(false)

  const [createNote, { loading: loadingCreate }] = useCreateNoteMutation({
    onCompleted: () => {
      message.success({ key: 'createNote', content: 'A new note has been added successfully.' })
      setFormVisible(false)
    },
    onError: () => {
      message.warning({ key: 'createNote', content: 'Maybe the module already noted.' })
    },
    update: (cache) => {
      cache.evict({ fieldName: 'student' })
    },
  })

  const [updateNote, { loading: loadingUpdate }] = useUpdateNoteMutation({
    onCompleted: () => {
      message.success({ key: 'updateNote', content: 'The note has been edited successfully.' })
      setFormVisible(false)
    },
    update: (cache) => {
      cache.evict({ fieldName: 'student' })
    },
    onError: () => {
      message.warning({ key: 'updateNote', content: 'Maybe the module already noted.' })
    },
  })

  const [deleteNote, { loading: loadingDelete }] = useDeleteNoteMutation({
    onCompleted: () => {
      message.success({ key: 'deleteNote', content: 'The note has been removed successfully.' })
    },
    update: (cache, { data }) => {
      if (data?.deleteNote) cache.evict({ id: cache.identify(data.deleteNote) })
    },
  })

  return {
    formVisible,
    setFormVisible,
    loadingForm: loadingCreate || loadingUpdate,
    loadingTable: loadingDelete,
    createNote,
    updateNote,
    deleteNote
  }
}
