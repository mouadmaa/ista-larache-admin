import React, { FC } from 'react'
import { Button, List, Popconfirm, Skeleton } from 'antd'
import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'

import './Formation.css'
import FormationForm from '../../components/Formation/FormationForm/FormationForm'
import { useFormation } from '../../hooks/useFormationHook'

const Formation: FC = () => {
  const {
    formations, loadingFormations, visible, setVisible,
    createFormation, loadingForm,
  } = useFormation()

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
        loading={loadingForm}
        onCreate={createFormation}
        onCancel={() => setVisible(false)}
      />
      <List
        className='formation-list'
        itemLayout="horizontal"
        header={<h3>Formations</h3>}
        loading={loadingFormations}
        dataSource={formations}
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
            <Skeleton title={false} loading={loadingFormations} active>
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
