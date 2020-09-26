import React, { FC, lazy, Suspense } from 'react'
import { Layout } from 'antd'

import './TapsContent.css'
import HeaderContent from '../Header/HeaderContent/HeaderContent'
import Spinner from '../../UI/Spinner/Spinner'

const Formation = lazy(() => import('../../../container/Formation/Formation'))
const Class = lazy(() => import('../../../container/Class/Class'))

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
        <Suspense
          fallback={<Spinner />}
        >
          {selectedTap === 'home' && <h3>Home</h3>}
          {selectedTap === 'formation' && <Formation />}
          {selectedTap === 'class' && <Class />}
        </Suspense>
      </Content>
    </Layout>
  )
}

export default TapsContent
