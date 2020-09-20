import React, { FC, useState } from 'react'
import { Layout, Menu } from 'antd'
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons'
import { useUsersQuery } from '../../generated/graphql'

const { Header, Content, Sider } = Layout

const Dashboard: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { data, error, loading } = useUsersQuery()

  if (error) console.error(error)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '16px', padding: '16px' }}>
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

export default Dashboard
