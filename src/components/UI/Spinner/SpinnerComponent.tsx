import React, { FC } from 'react'
import { Space, Spin } from 'antd'

const Spinner: FC = () => {
  return (
    <Space
      size='large'
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Spin size="large" />
    </Space>
  )
}

export default Spinner
