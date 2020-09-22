import React, { FC } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './LoginForm.css'
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
      className="login-form login-form-page"
      initialValues={{ email: '', password: '', }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
          {
            type: 'email',
            message: 'Please provide valid Email!',
          }
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
            message: 'Please input your Password!',
          },
          {
            min: 8,
            message: 'Enter at least 8 characters!',
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
          loading={loading}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
