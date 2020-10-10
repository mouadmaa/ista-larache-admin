import React, { FC, Fragment, useContext } from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Spin, Typography } from 'antd'

import './ProfileDropdown.css'
import AuthContext from '../../../context/authContext'
import { useLogoutMutation } from '../../../generated/graphql'

const ProfileDropdown: FC = () => {
  const { user, logout } = useContext(AuthContext)
  const [logoutMutation, { loading, client }] = useLogoutMutation()

  const onMenuClick = async ({ key }: { key: React.Key }) => {
    if (key === 'logout') {
      logout()
      await logoutMutation()
      await client.resetStore()
    }
  }

  const menuHeaderDropdown = (
    <Menu onClick={onMenuClick}>
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

  let dropdown = (
    <Dropdown
      overlay={menuHeaderDropdown}
      className={`profile-dropdown ${loading && 'profile-dropdown-loading'}`}
    >
      <span className='profile-dropdown-span'>
        <Avatar
          size="small"
          alt="avatar"
        />
        <Typography.Text type='secondary'>
          {user && user.name.toUpperCase()}
        </Typography.Text>
      </span>
    </Dropdown>
  )

  if (loading) {
    return (
      <Spin size='small'>
        {dropdown}
      </Spin>
    )
  }

  return (
    <Fragment>
      {dropdown}
    </Fragment>
  )
}

export default ProfileDropdown
