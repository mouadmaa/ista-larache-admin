/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import { Divider, Popconfirm, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import { Note, Student } from '../../../generated/graphql'

interface ModuleTableProps {
  notes: Note[]
  loading: boolean
  student?: Student
  // onDelete: (note: Note) => void
  // onEdit: (note: Note) => void
}

const ModuleTable: FC<ModuleTableProps> = props => {
  const { notes, student, loading } = props

  const columns: ColumnsType<Note> = [
    {
      title: "Module",
      dataIndex: "module",
    },
    {
      title: "Note 1",
      dataIndex: "note1",
    },
    {
      title: "Note 2",
      dataIndex: "note2",
    },
    {
      title: "Note 3",
      dataIndex: "note3",
    },
    {
      title: "EFM",
      dataIndex: "efm",
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '15%',
      render: (_, note) => (
        <Space size="small">
          <a onClick={() => console.log(note)}>
            Edit
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => console.log(note)}
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
      dataSource={notes}
      loading={loading}
      pagination={{ pageSize: 8 }}
      size='small'
      bordered
    />
  )
}

export default ModuleTable

const getTitle = (notes: Note[], loading: boolean, student?: Student) => {
  return loading ? 'Modules is Loading...' : student && notes.length
    ? `Modules Related to Formation: ${student.fullName}`
    : student ? 'This Formation does not have any modules'
      : 'Modules (Choose a formation)'
}
