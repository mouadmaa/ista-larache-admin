import React, { FC, useEffect, useState } from 'react'
import { Button, Popconfirm, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { Class, Formation } from '../../../generated/graphql'
import ClassSearch from '../ClassSearch/ClassSearch'

interface ClassTableProps {
  classes: Class[]
  formations: Formation[]
  loading: boolean
  onShowDrawer: (viewClass: Class) => void
  onEdit: (editedClass: Class) => void
  onDelete: (deletedClass: Class) => void
}

interface DataSourceClasses extends Class {
  formationName: string
}

let previousSearch = ''

const ClassTable: FC<ClassTableProps> = props => {
  const { classes, loading, formations, onShowDrawer, onDelete, onEdit } = props

  const [data, setData] = useState<DataSourceClasses[]>([])

  useEffect(() => {
    getClasses(classes, previousSearch, setData)
  }, [classes])

  const onSearch = (name: string) => {
    getClasses(classes, name, setData)
  }

  const columns: ColumnsType<DataSourceClasses> = [
    {
      title: "Formation",
      dataIndex: "formationName",
    },
    {
      title: "Year",
      dataIndex: "year",
      width: '15%',
    },
    {
      title: "Group",
      dataIndex: "group",
      width: '10%',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '15%',
      render: (_, record) => (
        <Space size="small">
          <Button onClick={() => onShowDrawer(record)}>
            View Class Details
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
    <Table<DataSourceClasses>
      className='class-table'
      title={() => (
        <ClassSearch
          formations={formations}
          onSearch={onSearch}
        />
      )}
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 10 }}
      size='large'
    />
  )
}

export default ClassTable

const getClasses = (classes: Class[], name: string, setData: React.Dispatch<React.SetStateAction<DataSourceClasses[]>>) => {
  previousSearch = name
  const data = classes.map(
    c => ({ ...c, formationName: c.formation.name })
  )
  if (name) {
    setData(data.filter(c => (
      c.formationName === name
    )))
  } else {
    setData(data)
  }
}
