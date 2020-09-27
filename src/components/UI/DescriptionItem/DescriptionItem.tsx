import React, { FC, ReactNode } from 'react'

import './DescriptionItem.css'

interface DescriptionItemProps {
  title: string
  content?: string | ReactNode
}

const DescriptionItem: FC<DescriptionItemProps> = props => {
  const { title, content } = props

  return (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  )
}

export default DescriptionItem
