import React, { FC } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { LoginMutationVariables } from '../../../generated/graphql'

interface LoginFormProps {
  onFinish: (variables: LoginMutationVariables) => Promise<void>
  loading: boolean
}

const LoginForm: FC<LoginFormProps> = props => {
  const { loading, onFinish } = props

  return (
    <Form
      name="normal_login"
      className="login-form"
      style={{
        width: '100%',
        maxWidth: '350px',
      }}
      initialValues={{ email: '', password: '', }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          size='large'
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            min: 8,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          size='large'
        />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="submit"
          className="login-form-button"
          style={{ width: '100%' }}
          loading={loading}
        >
          Log in
          </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
