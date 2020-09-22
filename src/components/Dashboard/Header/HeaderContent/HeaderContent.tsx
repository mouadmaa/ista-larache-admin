import React, { FC } from 'react'

import './HeaderContent.css'
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown'

const HeaderContent: FC = () => {
  return (
    <header className='header-content'>
      <ProfileDropdown />
    </header>
  )
}

export default HeaderContent
