import React, { FC, Fragment, useCallback, useEffect } from 'react'
import { Modal, Form, Button, message, Input, DatePicker } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import moment from 'moment'

import { Class, Student, StudentCreateInput } from '../../../generated/graphql'

interface StudentFormProps {
  student?: Student
  currentClass: Class
  visible: boolean
  loading: boolean
  onCreate: ({ variables }: { variables: StudentCreateInput }) => void
  onShowForm: () => void
  onHideForm: () => void
}

const StudentForm: FC<StudentFormProps> = props => {
  const {
    student, currentClass, visible, loading,
    onShowForm, onHideForm, onCreate
  } = props

  const [form] = useForm()

  const defaultFormValues = useCallback(() => {
    let password = ''
    do {
      password = Math.floor(Math.random() * 1000000).toString()
    } while (password.length !== 6)
    form.setFieldsValue({
      password,
      dateBirth: moment('2020/1/1'),
    })
  }, [form])

  useEffect(() => {
    if (student) {
      form.setFieldsValue(student)
    } else {
      defaultFormValues()
    }
  }, [form, student, defaultFormValues])

  const handleOk = async () => {
    const variables = await form.validateFields() as StudentCreateInput
    if (!variables.cef && !variables.cin) {
      message.info('Enter at least one (cin or cef)!', 6)
      return
    }
    variables.class = { connect: { id: currentClass.id } }
    variables.dateBirth = (variables.dateBirth as any).toISOString()
    let key = ''
    onCreate({ variables: variables as StudentCreateInput })
    key = 'createStudent'
    message.loading({ key, content: 'Loading...' })
  }

  return (
    <Fragment>
      <Button
        icon={<PlusCircleOutlined />}
        onClick={onShowForm}
      >
        Add Class
      </Button>
      <Modal
        title={`${student ? 'Edit the' : 'Create a new'} student`}
        okText={`${student ? 'Save' : 'Create'}`}
        cancelText="Cancel"
        onOk={handleOk}
        onCancel={onHideForm}
        visible={visible}
        confirmLoading={loading}
        afterClose={defaultFormValues}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: 'Please input the full name of student!',
              },
              {
                min: 5,
                message: 'Enter at least 5 characters!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cin"
            label="CIN"
            rules={[
              {
                min: 6,
                message: 'Enter at least 6 characters!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cef"
            label="CEF"
            rules={[
              {
                min: 6,
                message: 'Enter at least 6 characters!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                len: 6,
                message: 'Enter 6 numbers and characters!',
              },
            ]}
          >
            <Input placeholder='auto generate password (6 characters)' />
          </Form.Item>
          <Form.Item
            name="dateBirth"
            label="Date Birth"
          >
            <DatePicker
              style={{ width: '100%' }}
              defaultValue={moment('2020/1/1')}
              allowClear={false}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default StudentForm
