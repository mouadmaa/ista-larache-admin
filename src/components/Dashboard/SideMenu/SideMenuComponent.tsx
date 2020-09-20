import React, { FC } from 'react'
import { Menu, Layout } from 'antd'
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons'

import HeaderMenu from '../Header/HeaderMenu/HeaderMenuComponent'

const { Sider } = Layout

interface SideMenuProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  onSelect: ({ key }: { key: React.Key }) => void
  selectedTap: string
}

const SideMenu: FC<SideMenuProps> = props => {
  const { collapsed, setCollapsed, onSelect, selectedTap } = props

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <HeaderMenu />
      <Menu theme="dark" defaultSelectedKeys={[selectedTap]} mode="inline" onSelect={onSelect}>
        <Menu.Item key="home" icon={<PieChartOutlined />}>
          Home
      </Menu.Item>
        <Menu.Item key="other" icon={<DesktopOutlined />}>
          Other
      </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideMenu
