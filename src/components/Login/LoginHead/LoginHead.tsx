import React, { FC, Fragment } from 'react'
import { Typography } from 'antd'

import './LoginHead.css'

const LoginHead: FC = () => {
  return (
    <Fragment>
      <Typography.Title
        type='secondary'
        level={3}
      >
        Admin
      </Typography.Title>
      <Typography.Title
        className='login-head-primary'
        type='secondary'
        level={2}
      >
        ISTA LARACHE
      </Typography.Title>
    </Fragment>
  )
}

export default LoginHead
