import React, { FC, Fragment, useCallback, useEffect } from 'react'
import { Input, Modal, Form, Select, Button, message } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'

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

  const [form] = useForm()

  const defaultFormValues = useCallback(() => {
    form.setFieldsValue({
      name: '', descUrl: '', level: levels[0],
    })
  }, [form])

  useEffect(() => {
    if (formation) {
      form.setFieldsValue(formation)
    } else {
      defaultFormValues()
    }
  }, [form, formation, defaultFormValues])

  const handleOk = async () => {
    const variables = await form.validateFields()
    let key = ''
    if (formation) {
      key = 'updateFormation'
      onUpdate({ variables: { ...variables, id: formation.id } })
    } else {
      key = 'createFormation'
      onCreate({ variables: variables as FormationCreateInput })
    }
    message.loading({ key, content: 'Loading...' })
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
        title={`${formation ? `Edit ${formation.name}` : 'Create a new'} Formation`}
        okText={`${formation ? 'Save' : 'Create'}`}
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
