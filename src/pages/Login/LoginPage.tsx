import React, { FC, useContext } from 'react'
import { Layout } from 'antd'

import LoginBGSvg from '../../assets/svg/login-background.svg'
import LoginHead from '../../components/Login/LoginHead/LoginHeadComponent'
import LoginForm from '../../components/Login/LoginForm/LoginFormComponent'
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
    <Layout style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '25vh',
      backgroundImage: `url(${LoginBGSvg})`,
    }}>
      <LoginHead />
      <LoginForm
        loading={loading}
        onFinish={onFinish}
      />
    </Layout>
  )
}

export default LoginPage
