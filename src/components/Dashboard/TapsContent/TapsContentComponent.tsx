import React, { FC } from 'react'
import { Layout } from 'antd'

import HeaderContent from '../Header/HeaderContent/HeaderContentComponent'

const { Content } = Layout

interface ContentTapsProps {
  selectedTap: string
}

const TapsContent: FC<ContentTapsProps> = props => {
  const { selectedTap } = props

  return (
    <Layout className="site-layout" style={{ backgroundColor: '#f2f2f2' }}>
      <HeaderContent />
      <Content
        style={{
          margin: '16px',
          padding: '16px',
          backgroundColor: 'white',
          boxShadow: '0 0 10px #eee',
        }}>
        {selectedTap === 'home' && <h3>Home</h3>}
        {selectedTap === 'other' && <h3>Other</h3>}
      </Content>
    </Layout>
  )
}

export default TapsContent
