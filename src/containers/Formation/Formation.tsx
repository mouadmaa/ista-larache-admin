import React, { FC, useState } from 'react'
import { message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import './Formation.css'
import FormationList from '../../components/Formation/FormationList/FormationList'
import FormationForm from '../../components/Formation/FormationForm/FormationForm'
import Module from '../Module/Module'
import { useFormation } from '../../hooks/useFormationHook'
import { Formation as FormationType } from '../../generated/graphql'

const Formation: FC = () => {
  const [formation, setFormation] = useState<FormationType>()
  const [viewModule, setViewModule] = useState(false)

  const {
    formations, formationsLoading, formVisible, setFormVisible,
    createFormation, updateFormation, deleteFormation, formLoading,
    fetchFormationWithModules, modules, loadingModules,
  } = useFormation()

  const onShowForm = () => {
    setFormVisible(true)
    setFormation(undefined)
  }

  const onEdit = (selectedFormation: FormationType) => {
    setFormVisible(true)
    setFormation({ ...selectedFormation })
    if (formation?.id !== selectedFormation.id) setViewModule(false)
  }

  const onDelete = (formation: FormationType) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: `All the Modules, Classes and Students related to this formation
        "${formation.name}" they will also be permanently deleted`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
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
    setViewModule(true)
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
        onHideForm={onHideForm}
      />
      <FormationList
        formations={formations}
        loading={formationsLoading}
        onShowForm={onShowForm}
        onEdit={onEdit}
        onDelete={onDelete}
        onShowModules={onShowModules}
      />
      <Module
        modules={modules}
        viewModule={viewModule}
        loading={loadingModules}
        formation={formation}
      />
    </div>
  )
}

export default Formation
