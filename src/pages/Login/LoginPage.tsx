import React, { FC, useContext } from 'react'
import { Form, Input, Button, Layout, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import LoginBGSvg from '../../assets/svg/login-background.svg'
import { useLoginMutation } from '../../generated/graphql'
import AuthContext from '../../context/authContext'

interface LoginVariables {
  email: string
  password: string
}

const LoginPage: FC = () => {
  const { login } = useContext(AuthContext)
  const [loginMutation, { loading }] = useLoginMutation()

  const onFinish = async (variables: LoginVariables) => {
    const { data } = await loginMutation({ variables })
    if (data?.login) login(data.login)
  }

  return (
    <Layout style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '25vh',
      backgroundImage: `url(${LoginBGSvg})`,
    }}>
      <Typography.Title
        type='secondary'
        level={3}
      >
        Admin
      </Typography.Title>
      <Typography.Title
        type='secondary'
        level={2}
        style={{
          marginTop: '0',
          marginBottom: '25px',
        }}
      >
        ISTA LARACHE
      </Typography.Title>
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
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%' }}
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default LoginPage
