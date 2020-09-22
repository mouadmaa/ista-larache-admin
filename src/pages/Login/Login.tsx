import React, { FC, useContext } from 'react'
import { Layout } from 'antd'

import './Login.css'
import LoginHead from '../../components/Login/LoginHead/LoginHead'
import LoginForm from '../../components/Login/LoginForm/LoginForm'
import AuthContext from '../../context/authContext'
import { LoginMutationVariables, useLoginMutation } from '../../generated/graphql'

const LoginPage: FC = () => {
  const { login } = useContext(AuthContext)
  const [loginMutation, { loading }] = useLoginMutation()

  const onFinish = async (variables: LoginMutationVariables) => {
    const { data } = await loginMutation({ variables })
    if (data?.login) login(data.login)
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
