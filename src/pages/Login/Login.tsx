import React, { FC, useContext } from 'react'
import { Layout, message } from 'antd'

import './Login.css'
import LoginHead from '../../components/Login/LoginHead/LoginHead'
import LoginForm from '../../components/Login/LoginForm/LoginForm'
import { AuthContext } from '../../context/authContext'
import { LoginMutationVariables, useLoginMutation } from '../../generated/graphql'

const LoginPage: FC = () => {
  const { login } = useContext(AuthContext)
  const [loginMutation, { loading }] = useLoginMutation()

  const onFinish = async (variables: LoginMutationVariables) => {
    try {
      const { data } = await loginMutation({ variables })
      if (data?.login.user && data?.login.accessToken) {
        const { user, accessToken } = data.login
        login(user, accessToken)
      }
    } catch {
      message.error('email or password not valid')
    }
  }

  return (
    <Layout className='login-layout'>
      <LoginHead />
      <LoginForm
        loading={loading}
        onFinish={onFinish}
      />
    </Layout>
  )
}

export default LoginPage
