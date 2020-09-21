import React, { FC, Fragment } from 'react'
import { Typography } from 'antd'

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
        type='secondary'
        level={2}
        style={{
          marginTop: '0',
          marginBottom: '25px',
        }}
      >
        ISTA LARACHE
      </Typography.Title>
    </Fragment>
  )
}

export default LoginHead
