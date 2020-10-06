import React, { FC, useState } from 'react'
import { message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import './Formation.css'
import FormationList from '../../components/Formation/FormationList/FormationList'
import FormationForm from '../../components/Formation/FormationForm/FormationForm'
import { useFormation } from '../../hooks/useFormationHook'
import { Formation as FormationType } from '../../generated/graphql'
import Module from '../Module/Module'

const Formation: FC = () => {
  const [formation, setFormation] = useState<FormationType>()

  const {
    formations, formationsLoading, formVisible, setFormVisible,
    createFormation, updateFormation, deleteFormation, formLoading,
    fetchFormationWithModules, modules, loadingModules,
  } = useFormation()

  const onShowForm = () => {
    setFormVisible(true)
    setFormation(undefined)
  }

  const onEdit = (formation: FormationType) => {
    setFormVisible(true)
    setFormation({ ...formation })
  }

  const onDelete = (formation: FormationType) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: `All the Modules, Classes and Students related to this formation
        "${formation.name}" they will also be permanently deleted`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        setFormation(undefined)
        deleteFormation({ variables: { id: formation.id } })
        message.loading({ key: 'deleteFormation', content: 'Loading...' })
      }
    })
  }

  const onShowModules = (formation: FormationType) => {
    setFormation(formation)
    fetchFormationWithModules({ variables: { id: formation.id } })
  }

  const onHideForm = () => setFormVisible(false)

  return (
    <div className='formation-container'>
      <FormationForm
        formation={formation}
        visible={formVisible}
        loading={formLoading}
        onCreate={createFormation}
        onUpdate={updateFormation}
        onShowForm={onShowForm}
        onHideForm={onHideForm}
      />
      <FormationList
        formations={formations}
        loading={formationsLoading}
        onEdit={onEdit}
        onDelete={onDelete}
        onShowModules={onShowModules}
      />
      <Module
        modules={modules}
        loading={loadingModules}
        formation={formation}
      />
    </div>
  )
}

export default Formation
