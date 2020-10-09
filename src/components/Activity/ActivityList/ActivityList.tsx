import React, { FC } from 'react'
import { Button, List, Popconfirm, Skeleton, Typography } from 'antd'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import moment from 'moment'

import { Activity } from '../../../generated/graphql'

interface ActivityListProps {
  activities: Activity[]
  loading: boolean
  onShowForm: (activity?: Activity) => void
  onDelete: (activity: Activity) => void
}

const ActivityList: FC<ActivityListProps> = props => {
  const { activities, loading, onShowForm, onDelete } = props

  return (
    <List
      header={(
        <div className='activity-list-header'>
          <Typography.Title level={5}>
            Activities
          </Typography.Title>
          <Button
            type='primary'
            icon={<PlusCircleOutlined />}
            onClick={() => onShowForm()}
          >
            Add Activity
          </Button>
        </div>
      )}
      dataSource={activities}
      loading={loading}
      pagination={{ pageSize: 6 }}
      itemLayout='vertical'
      size='large'
      renderItem={activity => (
        <List.Item
          key={activity.id}
          actions={[
            <Button
              type='link'
              icon={<EditOutlined />}
              onClick={() => onShowForm(activity)}
            >
              Edit
            </Button>,
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => onDelete(activity)}
            >
              <Button
                type='link'
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </Popconfirm>
          ]}
          extra={
            <img
              style={{ borderRadius: 5 }}
              width={272}
              alt="activity img"
              src={activity.image}
            />
          }
        >
          <Skeleton title={false} loading={loading} active>
            <List.Item.Meta
              title={activity.title}
              description={`
                Creator: ${activity.creator},
                Date: ${moment(+activity.date).format('YYYY/MM/DD')}`
              }
            />
            <div
              dangerouslySetInnerHTML={{
                __html: `${activity.desc.substr(0, 200)}
                ${activity.desc.length >= 200 ? '...' : ''}`
              }}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  )
}

export default ActivityList
