/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import { Divider, Popconfirm, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import { Class, Student } from '../../../generated/graphql'

interface StudentTableProps {
  students: Student[]
  currentClass?: Class
  loading: boolean
}

const StudentTable: FC<StudentTableProps> = props => {
  const { students, loading } = props

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
      width: '20%',
      render: (_, record) => (
        <Space size="small">
          <a onClick={() => console.log(record)}>
            View Notes
          </a>
          <Divider plain />
          <a onClick={() => console.log(record)}>
            Edit
          </a>
          <Divider plain />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => console.log(record)}
          >
            <a>Delete</a>
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
