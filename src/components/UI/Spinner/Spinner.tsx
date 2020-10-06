import React, { FC } from 'react'
import { Space, Spin } from 'antd'

import './Spinner.css'

interface SpinnerProps {
  isPage?: boolean
}

const Spinner: FC<SpinnerProps> = props => {
  const { isPage = false } = props

  return (
    <Space
      className='spinner-space'
      style={{
        minHeight: `${isPage ? '100vh' : '80vh'}`
      }}
      size='large'
    >
      <Spin size="large" tip="Loading..." />
    </Space>
  )
}

export default Spinner
