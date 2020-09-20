import React, { FC, useContext } from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Typography } from 'antd'

import AuthContext from '../../../context/authContext'
import { useLogoutMutation } from '../../../generated/graphql'

const HeaderProfile: FC = () => {
  const { user, logout } = useContext(AuthContext)
  const [logoutMutation, { client }] = useLogoutMutation()

  const onMenuClick = async ({ key }: { key: React.Key }) => {
    if (key === 'logout') {
      await logoutMutation()
      await client.resetStore()
      logout()
    }
  }

  const menuHeaderDropdown = (
    <Menu selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="profile">
        <UserOutlined />
          Profile
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
          Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
          Logout
        </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menuHeaderDropdown}>
      <span style={{
        padding: '0 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Avatar
          size="small"
          alt="avatar"
          style={{ marginRight: '6px' }}
        />
        <Typography.Text type='secondary'>
          {user && user.name.toUpperCase()}
        </Typography.Text>
      </span>
    </Dropdown>
  )
}

export default HeaderProfile
