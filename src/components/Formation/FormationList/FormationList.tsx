import React, { FC } from 'react'
import { Button, List, Popconfirm, Skeleton } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { Formation } from '../../../generated/graphql'

interface FormationListProps {
  formations: Formation[]
  loading: boolean
  onEdit: () => void
  onDelete: (formation: Formation) => void
  onShowModules: (formation: Formation) => void
}

const FormationList: FC<FormationListProps> = props => {
  const { formations, loading, onEdit, onDelete, onShowModules } = props

  return (
    <List
      className='formation-list'
      itemLayout="horizontal"
      header={<h3>Formations</h3>}
      loading={loading}
      dataSource={formations}
      renderItem={formation => (
        <List.Item
          actions={[
            <Button onClick={() => onShowModules(formation)}>
              Show Modules
            </Button>,
            <Button
              icon={<EditOutlined />}
              onClick={onEdit}
            >
              Edit
            </Button>,
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => onDelete(formation)}
            >
              <Button icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          ]}
        >
          <Skeleton title={false} loading={loading} active>
            <List.Item.Meta
              title={<a href={formation.descUrl}>{formation.name}</a>}
              description={formation.level.replace('_', ' ')} />
          </Skeleton>
        </List.Item>
      )}
    />
  )
}

export default FormationList
