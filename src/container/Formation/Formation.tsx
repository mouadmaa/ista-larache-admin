import React, { FC, useState } from 'react'
import { Button, List, message, Popconfirm, Skeleton } from 'antd'
import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'

import './Formation.css'
import { FormationFragmentDoc, useCreateFormationMutation, useFormationsQuery } from '../../generated/graphql'
import FormationForm from '../../components/Formation/FormationForm/FormationForm'

const Formation: FC = () => {
  const [visible, setVisible] = useState(false)
  const { data, loading } = useFormationsQuery()

  const [createFormation, { loading: loadingCreate }] = useCreateFormationMutation({
    update: (cache, { data }) => {
      if (!data?.createFormation) return
      cache.modify({
        fields: {
          formations: (existingFormations = []) => {
            const newFormation = cache.writeFragment({
              data: data.createFormation,
              fragment: FormationFragmentDoc
            })
            return [...existingFormations, newFormation]
          }
        }
      })
      setVisible(false)
      message.success('A new formation has been added successfully')
    },
  })

  return (
    <div className='formation-container'>
      <Button
        icon={<PlusCircleOutlined />}
        onClick={() => setVisible(true)}
      >
        Add Formation
      </Button>
      <FormationForm
        visible={visible}
        loading={loadingCreate}
        onCreate={createFormation}
        onCancel={() => setVisible(false)}
      />
      <List
        className='formation-list'
        itemLayout="horizontal"
        header={<h3>Formations</h3>}
        loading={loading}
        dataSource={data?.formations || []}
        renderItem={formation => (
          <List.Item
            actions={[
              <Button
                icon={<EditOutlined />}
                onClick={() => console.log('edit')}
              >
                Edit
              </Button>,
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => console.log('delete')}
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
