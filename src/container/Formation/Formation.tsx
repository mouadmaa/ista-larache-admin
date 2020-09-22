/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { List, Popconfirm, Skeleton } from 'antd'

import './Formation.css'
import { useFormationsQuery } from '../../generated/graphql'

const Formation = () => {
  const { data, loading } = useFormationsQuery()

  return (
    <div className='formation-container'>
      <List
        className='formation-list'
        itemLayout="horizontal"
        header={<h3>Formations</h3>}
        loading={loading}
        dataSource={data?.formations || []}
        renderItem={formation => (
          <List.Item
            actions={[
              <a onClick={() => console.log('edit')} key='edit'>Edit</a>,
              <Popconfirm title="Sure to delete?" onConfirm={() => console.log('delete')}>
                <a>Delete</a>
              </Popconfirm>
            ]}
          >
            <Skeleton title={false} loading={loading} active>
              <List.Item.Meta
                title={<a href={formation.descUrl}>{formation.name}</a>}
                description={formation.level.replace('_', ' ')}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Formation
