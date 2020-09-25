import React, { FC, Fragment, useState } from 'react'

import ModuleForm from '../../components/Module/ModuleForm/ModuleForm'
import ModuleTable from '../../components/Module/ModuleTable/ModuleTable'
import { Formation, Module as ModuleType } from '../../generated/graphql'
import { useModule } from '../../hooks/useModuleHook'

interface ModuleProps {
  modules: ModuleType[]
  loading: boolean
  formation?: Formation
}

const Module: FC<ModuleProps> = props => {
  const { modules, loading, formation } = props

  const [module, setModule] = useState<ModuleType>()

  const {
    formVisible, setFormVisible, loadingForm, createModule,
    deleteModule, updateModule, loadingTable,
  } = useModule()

  const onShowForm = () => {
    setFormVisible(true)
    setModule(undefined)
  }

  const onEdit = (module: ModuleType) => {
    setFormVisible(true)
    setModule(module)
  }

  const onDelete = (module: ModuleType) => {
    deleteModule({ variables: { id: module.id } })
    setModule(undefined)
  }

  const onHideForm = () => setFormVisible(false)

  return (
    <Fragment>
      {formation && (
        <ModuleForm
          module={module}
          formation={formation}
          visible={formVisible}
          loading={loadingForm}
          onCreate={createModule}
          onUpdate={updateModule}
          onShowForm={onShowForm}
          onHideForm={onHideForm}
        />
      )}
      <ModuleTable
        modules={formation ? modules : []}
        loading={loading || loadingTable}
        formation={formation}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Fragment>
  )
}

export default Module
