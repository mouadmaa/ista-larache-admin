import React, { FC } from 'react'
import { Layout } from 'antd'

const { Header } = Layout

const HeaderSide: FC = () => {
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        height: '32px',
        margin: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      }}
    >
    </Header>
  )
}

export default HeaderSide
