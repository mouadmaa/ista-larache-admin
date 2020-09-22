import React, { FC } from 'react'
import { Input, Modal, Form, Select } from 'antd'

import { CreateFormationInput, Level } from '../../../generated/graphql'

export interface FormationFormProps {
  visible: boolean
  loading: boolean
  onCreate: ({ variables }: { variables: CreateFormationInput }) => void
  onCancel: () => void
}

const FormationForm: FC<FormationFormProps> = props => {
  const { visible, loading, onCreate, onCancel } = props
  const [form] = Form.useForm()

  const handleOk = async () => {
    onCreate({ variables: await form.validateFields() as CreateFormationInput })
    form.resetFields()
  }

  return (
    <Modal
      title="Create a new formation"
      okText="Create"
      cancelText="Cancel"
      onOk={handleOk}
      onCancel={onCancel}
      visible={visible}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          name: '',
          descUrl: '',
          level: Object.entries(Level)[0][1],
        }}
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
