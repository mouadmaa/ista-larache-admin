import React, { FC } from 'react'
import { Button, List, Popconfirm, Skeleton, Typography } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import moment from 'moment'

import { Activity } from '../../generated/graphql'

interface ActivityListProps {
  activities: Activity[]
  loading: boolean
}

const ActivityList: FC<ActivityListProps> = props => {
  const { activities, loading } = props

  return (
    <List
      className='activity-list'
      header={<Typography.Title level={4}>Activities</Typography.Title>}
      dataSource={activities}
      loading={loading}
      pagination={{
        onChange: console.log,
        pageSize: 5,
      }}
      itemLayout='vertical'
      size='large'
      renderItem={activity => (
        <List.Item
          key={activity.id}
          actions={[
            <Button
              type='link'
              icon={<EditOutlined />}
              onClick={() => console.log(activity)}
            >
              Edit
            </Button>,
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => console.log(activity)}
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
            description={activity.desc.substring(0, 200)}
          </Skeleton>
        </List.Item>
      )}
    />
  )
}

export default ActivityList
