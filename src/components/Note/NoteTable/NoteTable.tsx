/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react'
import { Divider, Popconfirm, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import { Module, Note, Student } from '../../../generated/graphql'

interface ModuleTableProps {
  notes: Note[]
  loading: boolean
  student?: Student
  modules: Module[]
  onDelete: (note: Note) => void
  onEdit: (note: Note) => void
}

interface DataSourceNotes extends Note {
  moduleName: string
}

const ModuleTable: FC<ModuleTableProps> = props => {
  const { notes, student, modules, loading, onDelete, onEdit } = props

  const [data, setData] = useState<DataSourceNotes[]>([])

  useEffect(() => {
    if (!modules.length || !notes.length) {
      setData([])
      return
    }
    setData(notes.map(
      note => ({ ...note, moduleName: note.module.name })
    ))
  }, [notes, modules])

  const columns: ColumnsType<Note> = [
    {
      title: "Module",
      dataIndex: "moduleName",
    },
    {
      title: "First Note",
      dataIndex: "note1",
    },
    {
      title: "Second Note",
      dataIndex: "note2",
    },
    {
      title: "Third Note",
      dataIndex: "note3",
    },
    {
      title: "Note of EFM",
      dataIndex: "efm",
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '15%',
      render: (_, note) => (
        <Space size="small">
          <a onClick={() => onEdit(note)}>
            Edit
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(note)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Table<Note>
      title={() => getTitle(notes, loading, student)}
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 8 }}
      size='small'
      bordered
    />
  )
}

export default ModuleTable

const getTitle = (notes: Note[], loading: boolean, student?: Student) => {
  return loading ? 'Notes is Loading...' : student && notes.length
    ? `Notes Related to Student: ${student.fullName}`
    : student ? 'This Student does not have any notes'
      : 'Notes (Choose a student)'
}
