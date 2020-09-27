import React, { FC, Fragment, useEffect } from 'react'
import { Input, Modal, Form, Select, Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

import { FormationCreateInput, UpdateFormationMutationVariables, Formation } from '../../../generated/graphql'
import { levels } from '../../../utils/getArrayEnum'

interface FormationFormProps {
  formation?: Formation
  visible: boolean
  loading: boolean
  onCreate: ({ variables }: { variables: FormationCreateInput }) => void
  onUpdate: ({ variables }: { variables: UpdateFormationMutationVariables }) => void
  onShowForm: () => void
  onHideForm: () => void
}

const FormationForm: FC<FormationFormProps> = props => {
  const { formation, visible, loading, onCreate, onUpdate, onShowForm, onHideForm } = props

  const [form] = Form.useForm()

  useEffect(() => {
    if (formation) {
      form.setFieldsValue(formation)
    } else {
      form.setFieldsValue({
        name: '', descUrl: '', level: levels[0],
      })
    }
  }, [form, formation])

  const handleOk = async () => {
    const variables = await form.validateFields()
    if (formation) {
      onUpdate({ variables: { ...variables, id: formation.id } })
    } else {
      onCreate({ variables: variables as FormationCreateInput })
    }
    form.resetFields()
  }

  return (
    <Fragment>
      <Button
        icon={<PlusCircleOutlined />}
        onClick={onShowForm}
      >
        Add Formation
      </Button>
      <Modal
        title={`${formation ? 'Edit the' : 'Create a new'} formation`}
        okText={`${formation ? 'Save' : 'Create'}`}
        cancelText="Cancel"
        onOk={handleOk}
        onCancel={onHideForm}
        visible={visible}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of formation!',
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
            name="descUrl"
            label="Description Url"
            rules={[
              {
                required: true,
                message: 'Please input the description url of formation!',
              },
              {
                type: 'url',
                message: 'Please provide valid url!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="level" label="Level of Formation">
            <Select defaultValue={levels[0]}>
              {levels.map(level => (
                <Select.Option key={level} value={level} >
                  {level.replace('_', ' ')}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default FormationForm
