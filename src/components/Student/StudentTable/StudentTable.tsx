import React, { FC, useEffect, useState } from 'react'
import { Button, Popconfirm, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { Student } from '../../../generated/graphql'
import StudentSearch from '../StudentSearch/StudentSearch'

interface StudentTableProps {
  students: Student[]
  loading: boolean
  onShowForm: () => void
  onShowDrawer: (student: Student) => void
  onShowNotes: (student: Student) => void
  onEdit: (student: Student) => void
  onDelete: (student: Student) => void
}

let previousSearch = ''

const StudentTable: FC<StudentTableProps> = props => {
  const {
    students, onShowDrawer, loading, onShowForm, onDelete, onEdit, onShowNotes
  } = props

  const [data, setData] = useState<Student[]>([])

  useEffect(() => {
    getStudents(previousSearch, students, setData)
  }, [students])

  const onSelect = (name: string) => {
    getStudents(name, students, setData)
  }

  const columns: ColumnsType<Student> = [
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "CIN",
      dataIndex: "cin",
    },
    {
      title: "CEF",
      dataIndex: "cef",
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '24%',
      render: (_, student) => (
        <Space>
          <Button
            type='link'
            onClick={() => onShowDrawer(student)}
          >
            View Student Details
          </Button>
          <Button
            type='link'
            onClick={() => onShowNotes(student)}
          >
            View Notes
          </Button>
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => onEdit(student)}
          />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(student)}
          >
            <Button
              type='link'
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Table<Student>
      className='student-table'
      title={() => (
        <StudentSearch
          students={students}
          onSearch={onSelect}
          onShowForm={onShowForm}
        />
      )}
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 6 }}
    />
  )
}

export default StudentTable

const getStudents = (name: string, data: Student[], setData: React.Dispatch<React.SetStateAction<Student[]>>) => {
  previousSearch = name
  if (name) {
    setData(data.filter(
      c => c.fullName.toUpperCase().includes(name.toUpperCase()))
    )
  } else {
    setData(data)
  }
}
