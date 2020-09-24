import React, { FC } from 'react'
import { Table } from 'antd'
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
    dataIndex: "number"
  },
  {
    key: "name",
    title: "Name",
    dataIndex: "name"
  },
]

const getTitle = (modules: Module[], loading: boolean, formation?: Formation) => {
  return loading ? 'Modules is Loading...' : formation && modules.length
    ? `Modules Related to Formation: ${formation.name}`
    : formation ? 'This Formation does not have any modules'
      : 'Select a formation'
}
