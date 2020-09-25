import React, { FC, useState } from 'react'

import './Formation.css'
import FormationList from '../../components/Formation/FormationList/FormationList'
import FormationForm from '../../components/Formation/FormationForm/FormationForm'
import { useFormation } from '../../hooks/useFormationHook'
import { Formation as FormationType } from '../../generated/graphql'
import Module from '../Module/Module'

const Formation: FC = () => {
  const [formation, setFormation] = useState<FormationType>()

  const {
    formations, loadingFormations, formVisible, setFormVisible,
    createFormation, updateFormation, deleteFormation, loadingForm,
    fetchFormationWithModules, modules, loadingModules,
  } = useFormation()

  const onShowForm = () => {
    setFormVisible(true)
    setFormation(undefined)
  }

  const onEdit = (formation: FormationType) => {
    setFormVisible(true)
    setFormation(formation)
  }

  const onDelete = (formation: FormationType) => {
    deleteFormation({ variables: { id: formation.id } })
    setFormation(undefined)
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
        loading={loadingForm}
        onCreate={createFormation}
        onUpdate={updateFormation}
        onShowForm={onShowForm}
        onHideForm={onHideForm}
      />
      <FormationList
        formations={formations}
        loading={loadingFormations}
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
