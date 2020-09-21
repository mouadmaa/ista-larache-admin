import React, { FC } from 'react'

import ProfileDropdown from '../ProfileDropdown/ProfileDropdownComponent'

const HeaderContent: FC = () => {
  return (
    <header style={{
      height: '45px',
      backgroundColor: 'white',
      boxShadow: '0 0 10px #eee',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '0 30px',
    }}>
      <ProfileDropdown />
    </header>
  )
}

export default HeaderContent
