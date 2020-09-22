import React, { FC } from 'react'
import { Space, Spin } from 'antd'

import './Spinner.css'

const Spinner: FC = () => {
  return (
    <Space className='spinner-space' size='large'>
      <Spin size="large" tip="Loading..." />
    </Space>
  )
}

export default Spinner
