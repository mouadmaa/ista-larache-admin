import React, { FC, useEffect, useState } from 'react'
import { Button, Popconfirm, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { Class, Student } from '../../../generated/graphql'
import StudentSearch from '../StudentSearch/StudentSearch'

interface StudentTableProps {
  students: Student[]
  currentClass?: Class
  loading: boolean
  onShowDrawer: (student: Student) => void
  onEdit: (student: Student) => void
  onDelete: (student: Student) => void
}

let previousSearch = ''

const StudentTable: FC<StudentTableProps> = props => {
  const { students, onShowDrawer, loading, onEdit, onDelete } = props

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
      render: (_, record) => (
        <Space>
          <Button onClick={() => onShowDrawer(record)}>
            View Student Details
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record)}
          >
            <Button icon={<DeleteOutlined />}>
              Delete
            </Button>
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
