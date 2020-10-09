import React, { FC, useEffect } from 'react'
import { Form, Button, message, InputNumber, Row, Col } from 'antd'
import { useForm } from 'antd/lib/form/Form'

import { Class, Student, UpdateStudentMutationVariables } from '../../../generated/graphql'

interface StudentNoteFinalProps {
  student: Student
  loading: boolean
  currentClass?: Class
  onUpdate: ({ variables }: { variables: UpdateStudentMutationVariables }) => void
}

const StudentNoteFinal: FC<StudentNoteFinalProps> = props => {
  const { student, loading, currentClass, onUpdate } = props

  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue(student)
  }, [form, student])

  const handleOk = async () => {
    const variables = await form.validateFields()
    onUpdate({ variables: { ...variables, id: student.id } })
    message.loading({ key: 'updateStudent', content: 'Loading...' })
    console.log(variables)
  }

  return (
    <Form
      className='student-note-final'
      form={form}
      layout="vertical"
      name="form_in_modal"
    >
      <Row align='middle'>
        <Col span={7} offset={1}>
          <Form.Item name="finalNote1">
            <InputNumber min={0} max={20} style={{ width: '100%' }} placeholder='First year note' />
          </Form.Item>
        </Col>
        {currentClass?.year === 'Second' && (
          <Col span={7} offset={1}>
            <Form.Item name="finalNote2">
              <InputNumber min={0} max={20} style={{ width: '100%' }} placeholder='Second year note' />
            </Form.Item>
          </Col>
        )}
        <Col span={7} offset={1}>
          <Button
            type='primary'
            loading={loading}
            onClick={handleOk}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default StudentNoteFinal
