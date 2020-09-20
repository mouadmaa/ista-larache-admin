import React, { FC } from 'react'

import HeaderProfile from '../HeaderProfile/HeaderProfileComponent'

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
      <HeaderProfile />
    </header>
  )
}

export default HeaderContent
