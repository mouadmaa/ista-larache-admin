import React, { FC } from 'react'
import { Button, List, Popconfirm, Skeleton, Typography } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { PlusCircleOutlined } from '@ant-design/icons'

import { Formation } from '../../../generated/graphql'

interface FormationListProps {
  formations: Formation[]
  loading: boolean
  onShowForm: () => void
  onEdit: (formation: Formation) => void
  onDelete: (formation: Formation) => void
  onShowModules: (formation: Formation) => void
}

const FormationList: FC<FormationListProps> = props => {
  const { formations, loading, onShowForm, onEdit, onDelete, onShowModules } = props

  return (
    <List
      className='formation-list'
      itemLayout="horizontal"
      header={(
        <div className='formation-list-header'>
          <Typography.Title level={5}>
            Formations
          </Typography.Title>
          <Button
            type='primary'
            icon={<PlusCircleOutlined />}
            onClick={onShowForm}
          >
            Add Formation
          </Button>
        </div>
      )}
      loading={loading}
      dataSource={formations}
      renderItem={formation => (
        <List.Item
          key={formation.id}
          actions={[
            <Button
              type='link'
              onClick={() => onShowModules(formation)}
            >
              View Modules
            </Button>,
            <Button
              type='link'
              icon={<EditOutlined />}
              onClick={() => onEdit(formation)}
            >
              Edit
            </Button>,
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => onDelete(formation)}
            >
              <Button
                type='link'
                icon={<DeleteOutlined />}
              >
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
