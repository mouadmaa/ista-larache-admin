import React, { FC } from 'react'
import { Layout } from 'antd'

import './TapsContent.css'
import HeaderContent from '../Header/HeaderContent/HeaderContent'
import Formation from '../../../container/Formation/Formation'

const { Content } = Layout

interface ContentTapsProps {
  selectedTap: string
}

const TapsContent: FC<ContentTapsProps> = props => {
  const { selectedTap } = props

  return (
    <Layout className="site-layout taps-layout">
      <HeaderContent />
      <Content className='taps-content'>
        {selectedTap === 'home' && <h3>Home</h3>}
        {selectedTap === 'formation' && <Formation />}
      </Content>
    </Layout>
  )
}

export default TapsContent
