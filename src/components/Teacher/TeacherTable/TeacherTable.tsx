import React, { FC } from 'react'
import { Button, Popconfirm, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined } from '@ant-design/icons'
import { PlusCircleOutlined } from '@ant-design/icons'

import { User } from '../../../generated/graphql'

interface TeacherTableProps {
  teachers: User[]
  loading: boolean
  onShowForm: () => void
  onDelete: (teacher: User) => void
}

const TeacherTable: FC<TeacherTableProps> = props => {
  const { teachers, loading, onShowForm, onDelete } = props

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '10%',
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => onDelete(record)}
        >
          <Button
            type='link'
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      ),
    },
  ]

  return (
    <Table<User>
      title={() => (
        <div className='teacher-table-header'>
          <Typography.Title level={5}>
            Teachers
          </Typography.Title>
          <Button
            type='primary'
            icon={<PlusCircleOutlined />}
            onClick={onShowForm}
          >
            Add Teacher
          </Button>
        </div>
      )}
      columns={columns}
      dataSource={teachers}
      loading={loading}
      pagination={{ pageSize: 12 }}
    />
  )
}

export default TeacherTable
