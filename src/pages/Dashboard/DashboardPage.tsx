import React, { FC, useState } from 'react'
import { Layout } from 'antd'

import SideMenu from '../../components/Dashboard/SideMenu/SideMenuComponent'
import TapsContent from '../../components/Dashboard/TapsContent/TapsContentComponent'

const DashboardPage: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedTap, setSelectedTap] = useState('home')

  const onSelect = ({ key }: { key: React.Key }) => {
    setSelectedTap(key as string)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onSelect={onSelect}
        selectedTap={selectedTap}
      />
      <TapsContent selectedTap={selectedTap} />
    </Layout>
  )
}

export default DashboardPage
