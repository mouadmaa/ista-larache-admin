import React, { FC } from 'react'
import { Col, Drawer, Row, Typography } from 'antd'

import { Class } from '../../../generated/graphql'
import DescriptionItem from '../../UI/DescriptionItem/DescriptionItem'

interface ClassDrawerProps {
  currentClass?: Class
  visibleDrawer: boolean
  onCloseDrawer: () => void
}

const ClassDrawer: FC<ClassDrawerProps> = props => {
  const { currentClass, visibleDrawer, onCloseDrawer } = props

  return (
    <Drawer
      title="View Class"
      placement="right"
      width={640}
      closable={false}
      onClose={onCloseDrawer}
      visible={visibleDrawer}
    >
      <Typography.Title level={5}>Class</Typography.Title>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Year" content={currentClass?.year} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Group" content={currentClass?.group} />
        </Col>
      </Row>
      <Typography.Title level={5}>Formation</Typography.Title>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Name" content={currentClass?.formation.name} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Level" content={currentClass?.formation.level.replace('_', ' ')} />
        </Col>
      </Row>
      <Typography.Title level={5}>Teacher</Typography.Title>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Name" content={currentClass?.teacher.name} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Email" content={currentClass?.teacher.email} />
        </Col>
      </Row>
    </Drawer>
  )
}

export default ClassDrawer
