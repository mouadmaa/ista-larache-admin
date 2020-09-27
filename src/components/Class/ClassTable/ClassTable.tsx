import React, { FC } from 'react'
import { Button, Popconfirm, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { Class } from '../../../generated/graphql'

interface ClassTableProps {
  classes: Class[]
  loading: boolean
  onEdit: (editedClass: Class) => void
  onDelete: (deletedClass: Class) => void
}

interface DataSourceClasses extends Class {
  formationName: string
}

const ClassTable: FC<ClassTableProps> = props => {
  const { classes, loading, onDelete, onEdit } = props

  const columns: ColumnsType<DataSourceClasses> = [
    {
      title: "Formation",
      dataIndex: "formationName",
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Group",
      dataIndex: "group",
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '15%',
      render: (_, module) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(module)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(module)}
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
    <Table<DataSourceClasses>
      className='class-table'
      title={() => <h3>Classes</h3>}
      columns={columns}
      dataSource={getDataSourceClasses(classes)}
      loading={loading}
      pagination={{ pageSize: 10 }}
      size='large'
    />
  )
}

export default ClassTable

const getDataSourceClasses = (classes: Class[]): DataSourceClasses[] => {
  return classes.map(c => ({ ...c, formationName: c.formation.name }))
}
