import React, { FC, useEffect, useState } from 'react'
import { Col, Drawer, Row, Typography } from 'antd'

import { Class, Formation, Student } from '../../../generated/graphql'
import DescriptionItem from '../../UI/DescriptionItem/DescriptionItem'

interface StudentDrawerProps {
  student?: Student
  currentClass?: Class
  formations: Formation[]
  visibleDrawer: boolean
  onCloseDrawer: () => void
}

const StudentDrawer: FC<StudentDrawerProps> = props => {
  const { student, currentClass, formations, visibleDrawer, onCloseDrawer } = props

  const [formation, setFormation] = useState<Formation>()

  useEffect(() => {
    const formation = formations.find(
      formation => formation.classes.find(
        c => c.id === currentClass?.id
      )
    )
    setFormation(formation)
  }, [currentClass, formations])


  return (
    <Drawer
      title="View Class"
      placement="right"
      width={640}
      closable={false}
      onClose={onCloseDrawer}
      visible={visibleDrawer}
    >
      <Typography.Title level={5}>Student</Typography.Title>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Full Name" content={student?.fullName} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Password" content={student?.password} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="CIN" content={student?.cin} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="CEF" content={student?.cef} />
        </Col>
      </Row>
      <Row>
        {student?.finalNote1 && (
          <Col span={12}>
            <DescriptionItem title="Final Note 1" content={student.finalNote1} />
          </Col>
        )}
        {student?.finalNote2 && (
          <Col span={12}>
            <DescriptionItem title="Final Note 2" content={student.finalNote2} />
          </Col>
        )}
      </Row>
      <Typography.Title level={5}>Formation</Typography.Title>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Name" content={formation?.name} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Level" content={formation?.level.replace('_', ' ')} />
        </Col>
      </Row>
      <Typography.Title level={5}>Class</Typography.Title>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Year" content={currentClass?.year} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Group" content={currentClass?.group} />
        </Col>
      </Row>
    </Drawer>
  )
}

export default StudentDrawer
