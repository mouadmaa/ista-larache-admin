import React, { FC, useEffect } from 'react'
import { Input, Modal, Form, Select } from 'antd'

import { CreateFormationInput, UpdateFormationMutationVariables, Formation, Level } from '../../../generated/graphql'

interface FormationFormProps {
  formation: Formation | undefined
  visible: boolean
  loading: boolean
  onCreate: ({ variables }: { variables: CreateFormationInput }) => void
  onUpdate: ({ variables }: { variables: UpdateFormationMutationVariables }) => void
  onCancel: () => void
}

const FormationForm: FC<FormationFormProps> = props => {
  const { formation, visible, loading, onCreate, onUpdate, onCancel } = props
  const [form] = Form.useForm()

  useEffect(() => {
    if (formation) {
      form.setFieldsValue(formation)
    } else {
      form.setFieldsValue({
        name: '', descUrl: '', level: Object.entries(Level)[0][1],
      })
    }
  }, [form, formation])

  const handleOk = async () => {
    const variables = await form.validateFields()
    if (formation) {
      onUpdate({ variables: { ...variables, id: formation.id } })
    } else {
      onCreate({ variables: variables as CreateFormationInput })
    }
  }

  return (
    <Modal
      title={`${formation ? 'Edit' : 'Create a new'} formation`}
      okText={`${formation ? 'Save' : 'Create'}`}
      cancelText="Cancel"
      onOk={handleOk}
      onCancel={onCancel}
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
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name of formation!',
            },
            {
              min: 5,
              message: 'Enter at least 5 characters!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="descUrl"
          label="Description Url"
          rules={[
            {
              required: true,
              message: 'Please input the description url of formation!',
            },
            {
              type: 'url',
              message: 'Please provide valid url!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="level" label="Level of Formation">
          <Select defaultValue={Object.entries(Level)[0][1]}>
            {Object.entries(Level).map(level => (
              <Select.Option key={level[0]} value={level[1]} >
                {level[1].replace('_', ' ')}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormationForm
