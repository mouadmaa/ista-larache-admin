import React, { FC, lazy, Suspense, useState } from 'react'
import { Layout, Menu } from 'antd'
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons'

import './Dashboard.css'
import ProfileDropdown from '../../components/Dashboard/ProfileDropdown/ProfileDropdown'
import Spinner from '../../components/UI/Spinner/Spinner'
import Timetable from '../../container/Timetable/Timetable'

const { Sider, Header, Content } = Layout

const Formation = lazy(() => import('../../container/Formation/Formation'))
const Class = lazy(() => import('../../container/Class/Class'))
const Student = lazy(() => import('../../container/Student/Student'))

const DashboardPage: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedTap, setSelectedTap] = useState('timetable')

  const onSelect = ({ key }: { key: React.Key }) => {
    setSelectedTap(key as string)
  }

  return (
    <Layout className='dashboard-layout'>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Header className="site-layout-background header-menu" />
        <Menu theme="dark" defaultSelectedKeys={[selectedTap]} mode="inline" onSelect={onSelect}>
          <Menu.Item key="home" icon={<PieChartOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="formation" icon={<DesktopOutlined />}>
            Formation
          </Menu.Item>
          <Menu.Item key="class" icon={<DesktopOutlined />}>
            Class
          </Menu.Item>
          <Menu.Item key="student" icon={<DesktopOutlined />}>
            Student
          </Menu.Item>
          <Menu.Item key="timetable" icon={<DesktopOutlined />}>
            Timetable
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout taps-layout">
        <header className='header-content'>
          <ProfileDropdown />
        </header>
        <Content className='taps-content'>
          <Suspense
            fallback={<Spinner />}
          >
            {selectedTap === 'home' && <h3>Home</h3>}
            {selectedTap === 'formation' && <Formation />}
            {selectedTap === 'class' && <Class />}
            {selectedTap === 'student' && <Student />}
            {selectedTap === 'timetable' && <Timetable />}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardPage
