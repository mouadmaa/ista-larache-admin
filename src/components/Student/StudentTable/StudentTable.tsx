import React, { FC } from 'react'
import { Button, Popconfirm, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { Class, Student } from '../../../generated/graphql'

interface StudentTableProps {
  students: Student[]
  currentClass?: Class
  loading: boolean
  onShowDrawer: (student: Student) => void
  onEdit: (student: Student) => void
  onDelete: (student: Student) => void
}

const StudentTable: FC<StudentTableProps> = props => {
  const { students, onShowDrawer, loading, onEdit, onDelete } = props

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
      title={() => 'Students'}
      columns={columns}
      dataSource={students}
      loading={loading}
      pagination={{ pageSize: 6 }}
    />
  )
}

export default StudentTable
