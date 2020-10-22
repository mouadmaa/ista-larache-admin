import React, { FC } from 'react'
import { Typography } from 'antd'

import './Home.css'

const Home: FC = () => {
  return (
    <div className='home-container'>
      <Typography.Title type='secondary'>
        ISTA LARACHE ADMIN
      </Typography.Title>
    </div>
  )
}

export default Home
