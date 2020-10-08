import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Button, Col, DatePicker, Form, Input, message, Row, Typography, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import moment from 'moment'

import AuthContext from '../../../context/authContext'
import RichTextEditor from '../../UI/RichTextEditor/RichTextEditor'
import { Activity, ActivityCreateInput } from '../../../generated/graphql'
import { getImageBase64 } from '../../../utils/getImageBase64'

interface ActivityFormProps {
  activity?: Activity
  loading: boolean
  onCreate: ({ variables }: { variables: ActivityCreateInput & { file: string } }) => void
  onHideForm: () => void
}

const ActivityForm: FC<ActivityFormProps> = props => {
  const { activity, onHideForm, onCreate, loading } = props

  const [file, setFile] = useState<any>()
  const [desc, setDesc] = useState('')

  const { user } = useContext(AuthContext)
  const [form] = useForm()

  const defaultFormValues = useCallback(() => {
    form.setFieldsValue({
      title: '', date: moment(Date.now()),
    })
  }, [form])

  useEffect(() => {
    if (activity) form.setFieldsValue(activity)
    else defaultFormValues()
  }, [form, activity, defaultFormValues])

  const handleOk = async () => {
    const variables = await form.validateFields()
    if (desc.length < 5 || variables.title.length < 5) {
      message.info('Title and description are required (at least 5 characters)!')
      return
    }

    variables.creator = user?.name
    variables.date = variables.date.toISOString()
    variables.desc = desc

    let key = 'updateActivity'
    if (activity) {
      if (file) variables.file = await getImageBase64(file)
    } else {
      key = 'createActivity'
      if (!file) {
        message.info('Please choose an image of activity!')
        return
      }
      variables.file = await getImageBase64(file)
      onCreate({ variables: variables as ActivityCreateInput & { file: string } })
    }
    console.log(variables)
    message.loading({ key, content: 'Loading...' })
  }

  const beforeUpload = (file: any) => {
    setFile(file)
    return false
  }

  const onRemove = () => setFile(undefined)

  return (
    <div className='activity-form'>
      <Typography.Title level={4}>
        {`${activity ? `Edit ${activity.title}`
          : 'Create a new'} Activity, Creator: ${user?.name}`}
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Row>
          <Col span={9}>
            <Form.Item
              name="title"
              label="Title"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8} offset={1}>
            <Form.Item
              name="date"
              label="Date"
            >
              <DatePicker
                style={{ width: '100%' }}
                allowClear={false}
              />
            </Form.Item>
          </Col>
          <Col span={5} offset={1}>
            <Form.Item
              label="Image"
            >
              <Upload
                defaultFileList={file ? [file] : []}
                beforeUpload={beforeUpload}
                onRemove={onRemove}
                listType="picture"
              >
                {!file && (
                  <Button icon={<UploadOutlined />}>
                    Choose An Image
                  </Button>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Description"
        >
          <RichTextEditor
            html={desc}
            setHtml={setDesc}
          />
        </Form.Item>
      </Form>
      <Button
        type='primary'
        onClick={handleOk}
        loading={loading}
      >
        {`${activity ? 'Save' : 'Create'}`}
      </Button>
      <Button onClick={onHideForm}>
        Cancel
      </Button>
    </div>
  )
}

export default ActivityForm
