import React, { FC, useCallback, useEffect } from 'react'
import { Modal, Form, message, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { RegisterMutationVariables } from '../../../generated/graphql'

interface TeacherFormProps {
  register: ({ variables }: { variables: RegisterMutationVariables }) => void
  visible: boolean
  loading: boolean
  onHideForm: () => void
}

const TeacherForm: FC<TeacherFormProps> = props => {
  const { visible, loading, register, onHideForm } = props

  const [form] = useForm()

  const defaultFormValues = useCallback(() => {
    form.setFieldsValue({
      name: '', email: '', password: '', passwordConfirm: '',
    })
  }, [form])

  useEffect(() => {
    defaultFormValues()
  }, [form, defaultFormValues])

  const handleOk = async () => {
    const variables = await form.validateFields()
    if (variables.password !== variables.passwordConfirm) {
      message.info('Passwords are not the same!')
      return
    }
    register({ variables: variables as RegisterMutationVariables })
    message.loading({ key: 'register', content: 'Loading...' })
  }

  return (
    <Modal
      title={'Add a new teacher'}
      okText={'Add'}
      cancelText='Cancel'
      onOk={handleOk}
      onCancel={onHideForm}
      visible={visible}
      confirmLoading={loading}
      afterClose={defaultFormValues}
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
              message: 'Please enter teacher name!',
            },
            {
              min: 3,
              message: 'Enter at least 3 characters!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please enter teacher email!',
            },
            {
              type: 'email',
              message: 'Please provide valid Email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please enter teacher password!',
            },
            {
              min: 8,
              message: 'Enter at least 8 characters!',
            },
          ]}
        >
          <Input.Password type="password" />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: 'Please enter teacher confirm password!',
            },
            {
              min: 8,
              message: 'Enter at least 8 characters!',
            },
          ]}
        >
          <Input.Password type="password" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TeacherForm
