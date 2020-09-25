/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import { Popconfirm, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import { Formation, Module } from '../../../generated/graphql'

interface ModuleTableProps {
  modules: Module[]
  loading: boolean
  formation?: Formation
}

const ModuleTable: FC<ModuleTableProps> = props => {
  const { modules, loading, formation } = props

  return (
    <Table<Module>
      title={() => getTitle(modules, loading, formation)}
      columns={columns}
      dataSource={modules}
      loading={loading}
      pagination={{ pageSize: 6 }}
      size='small'
      bordered
    />
  )
}

export default ModuleTable

const columns: ColumnsType<Module> = [
  {
    key: "number",
    title: "Number",
    dataIndex: "number",
    width: '10%',
  },
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    width: '15%',
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <Popconfirm title="Sure to delete?">
          <a>Delete</a>
        </Popconfirm>
      </Space>
    ),
  },
]

const getTitle = (modules: Module[], loading: boolean, formation?: Formation) => {
  return loading ? 'Modules is Loading...' : formation && modules.length
    ? `Modules Related to Formation: ${formation.name}`
    : formation ? 'This Formation does not have any modules'
      : 'Modules (Choose a formation)'
}
