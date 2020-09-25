import React, { FC, Fragment, useEffect } from 'react'
import { Input, Modal, Form, Button, InputNumber } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

import { Formation, Module, ModuleCreateInput } from '../../../generated/graphql'

interface ModuleFormProps {
  module?: Module
  formation: Formation
  visible: boolean
  loading: boolean
  onCreate: ({ variables }: { variables: ModuleCreateInput }) => void
  onShowForm: () => void
  onHideForm: () => void
}

const ModuleForm: FC<ModuleFormProps> = props => {
  const { module, loading, formation, visible, onShowForm, onHideForm, onCreate } = props

  const [form] = Form.useForm()

  useEffect(() => {
    if (module) {
      form.setFieldsValue(module)
    } else {
      form.setFieldsValue({ number: 1, name: '' })
    }
  }, [form, module])

  const handleOk = async () => {
    const variables = await form.validateFields() as ModuleCreateInput
    variables.formation = { connect: { id: formation.id } }
    onCreate({ variables })
  }

  return (
    <Fragment>
      <Button
        icon={<PlusCircleOutlined />}
        onClick={onShowForm}
      >
        Add Module
      </Button>
      <Modal
        title={`${module ? 'Edit the' : 'Create a new'} module`}
        okText={`${module ? 'Save' : 'Create'}`}
        cancelText="Cancel"
        onOk={handleOk}
        onCancel={onHideForm}
        visible={visible}
        confirmLoading={loading}
        afterClose={form.resetFields}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="number"
            label="Number of Module"
            rules={[
              {
                required: true,
                message: 'Please input the number of module!',
              }
            ]}
          >
            <InputNumber min={1} max={30} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of module!',
              },
              {
                min: 3,
                message: 'Enter at least 3 characters!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default ModuleForm
