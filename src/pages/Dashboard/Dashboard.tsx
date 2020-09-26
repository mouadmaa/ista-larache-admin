import React, { FC, useState } from 'react'
import { Layout } from 'antd'

import './Dashboard.css'
import SideMenu from '../../components/Dashboard/SideMenu/SideMenu'
import TapsContent from '../../components/Dashboard/TapsContent/TapsContent'

const DashboardPage: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedTap, setSelectedTap] = useState('class')

  const onSelect = ({ key }: { key: React.Key }) => {
    setSelectedTap(key as string)
  }

  return (
    <Layout className='dashboard-layout'>
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
