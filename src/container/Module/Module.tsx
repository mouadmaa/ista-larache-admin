import React, { FC, Fragment, useState } from 'react'
import { message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

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
    setModule({ ...module })
  }

  const onDelete = (module: ModuleType) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: `All the Notes related to this Module "${module.name}"
        they will also be permanently deleted`,
      okText: 'Confirm',
      cancelText: 'Cancel',
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
