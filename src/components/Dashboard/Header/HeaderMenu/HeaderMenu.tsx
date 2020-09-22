import React, { FC } from 'react'
import { Layout } from 'antd'

import './HeaderMenu.css'

const { Header } = Layout

const HeaderMenu: FC = () => {
  return (
    <Header className="site-layout-background header-menu" />
  )
}

export default HeaderMenu
