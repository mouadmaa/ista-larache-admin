import React, { FC, Fragment, useState } from 'react'
import { message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import './Module.css'
import ModuleForm from '../../components/Module/ModuleForm/ModuleForm'
import ModuleTable from '../../components/Module/ModuleTable/ModuleTable'
import { Formation, Module as ModuleType } from '../../generated/graphql'
import { useModule } from '../../hooks/useModuleHook'

interface ModuleProps {
  modules: ModuleType[]
  loading: boolean
  formation?: Formation
  viewModule: boolean
}

const Module: FC<ModuleProps> = props => {
  const { modules, loading, formation, viewModule } = props

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
    setModule({ ...module })
  }

  const onDelete = (module: ModuleType) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: `All the Notes related to this Module "${module.name}"
        they will also be permanently deleted`,
      okText: 'Yser',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        setModule(undefined)
        deleteModule({ variables: { id: module.id } })
        message.loading({ key: 'deleteModule', content: 'Loading...' })
      }
    })

  }

  const onHideForm = () => setFormVisible(false)

  return (
    <Fragment>
      {formation && (
        <ModuleForm
          module={module}
          modules={modules}
          formation={formation}
          visible={formVisible}
          loading={loadingForm}
          onCreate={createModule}
          onUpdate={updateModule}
          onHideForm={onHideForm}
          />
      )}
      <ModuleTable
        modules={formation && viewModule ? modules : []}
        loading={loading || loadingTable}
        formation={formation}
        viewModule={viewModule}
        onShowForm={onShowForm}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Fragment>
  )
}

export default Module
