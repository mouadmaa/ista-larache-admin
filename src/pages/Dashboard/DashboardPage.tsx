import React, { FC, useState } from 'react'
import { Layout, Menu } from 'antd'
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons'

import { useUsersQuery } from '../../generated/graphql'
import HeaderSide from '../../components/Header/HeaderSide/HeaderSideComponent'
import HeaderContent from '../../components/Header/HeaderContent/HeaderContentComponent'

const { Content, Sider } = Layout

const DashboardPage: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { data, loading } = useUsersQuery()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <HeaderSide />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ backgroundColor: '#f2f2f2' }}>
        <HeaderContent />
        <Content style={{ margin: '16px', padding: '16px', backgroundColor: 'white', boxShadow: '0 0 10px #eee' }}>
          <div className="site-layout-background" style={{ minHeight: 360 }}>
            {loading ? (
              <h3>Loading...</h3>
            ) : data && (
              <p>{JSON.stringify(data.users, null, 4)}</p>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardPage
