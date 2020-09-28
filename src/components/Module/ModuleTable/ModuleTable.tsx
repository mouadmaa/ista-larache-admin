/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import { Divider, Popconfirm, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import { Formation, Module } from '../../../generated/graphql'

interface ModuleTableProps {
  modules: Module[]
  loading: boolean
  formation?: Formation
  onDelete: (module: Module) => void
  onEdit: (module: Module) => void
}

const ModuleTable: FC<ModuleTableProps> = props => {
  const { modules, loading, formation, onDelete, onEdit } = props

  const columns: ColumnsType<Module> = [
    {
      title: "Number",
      dataIndex: "number",
      width: '10%',
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '15%',
      render: (_, module) => (
        <Space size="small">
          <a onClick={() => onEdit(module)}>
            Edit
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(module)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Table<Module>
      title={() => getTitle(modules, loading, formation)}
      columns={columns}
      dataSource={modules}
      loading={loading}
      pagination={{ pageSize: 8 }}
      size='small'
      bordered
    />
  )
}

export default ModuleTable

const getTitle = (modules: Module[], loading: boolean, formation?: Formation) => {
  return loading ? 'Modules is Loading...' : formation && modules.length
    ? `Modules Related to Formation: ${formation.name}`
    : formation ? 'This Formation does not have any modules'
      : 'Modules (Choose a formation)'
}
