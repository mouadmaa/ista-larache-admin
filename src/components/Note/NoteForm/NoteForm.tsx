import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Modal, Form, Button, InputNumber, Select, message } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'

import { Student, Note, Module, NoteCreateInput, UpdateNoteMutationVariables } from '../../../generated/graphql'

interface NoteFormProps {
  note?: Note
  notes: Note[]
  student: Student
  modules: Module[]
  visible: boolean
  loading: boolean
  onCreate: ({ variables }: { variables: NoteCreateInput }) => void
  onUpdate: ({ variables }: { variables: UpdateNoteMutationVariables }) => void
  onShowForm: () => void
  onHideForm: () => void
}

const NoteForm: FC<NoteFormProps> = props => {
  const {
    note, loading, student, modules, notes, visible, onShowForm,
    onHideForm, onCreate, onUpdate
  } = props

  const [nextModules, setNextModules] = useState<Module[]>([])
  const [form] = useForm()

  useEffect(() => {
    setNextModules(modules.filter(
      module => !notes.find(
        note => note.module.id === module.id
      )
    ))
  }, [modules, notes])

  const defaultFormValues = useCallback(() => {
    form.setFieldsValue({
      note1: null, note2: null, note3: null, efm: null,
      moduleName: nextModules[0]?.name || ''
    })
  }, [form, nextModules])

  useEffect(() => {
    if (note) {
      form.setFieldsValue({
        ...note, module: note?.module.name,
      })
    } else {
      defaultFormValues()
    }
  }, [form, note, defaultFormValues])

  const handleOk = async () => {
    const variables = await form.validateFields()
    variables.module = {
      connect: {
        id: modules.find(
          module => module.name === variables.moduleName
        )?.id
      }
    }
    let key = ''
    if (note) {
      key = 'updateNote'
      onUpdate({ variables: { ...variables, id: note.id } })
    } else {
      if (!nextModules.length) {
        message.info(`You don't have any module left, Please add new module!`)
        return
      }
      key = 'createNote'
      variables.student = { connect: { id: student.id } }
      onCreate({ variables: variables as NoteCreateInput })
    }
    message.loading({ key, content: 'Loading...' })
  }

  return (
    <Fragment>
      <Button
        icon={<PlusCircleOutlined />}
        onClick={onShowForm}
      >
        Add Note
      </Button>
      <Modal
        title={`${note ? 'Edit the' : 'Create a new'} note`}
        okText={`${note ? 'Save' : 'Create'}`}
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
            name="moduleName"
            label="Module"
          >
            <Select
              loading={loading}
              defaultValue={nextModules[0]?.name || ''}
              showSearch
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {nextModules.map(module => (
                <Select.Option key={module.id} value={module.name}>
                  {module.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="note1"
            label="First note"
          >
            <InputNumber min={0} max={20} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="note2"
            label="Second note"
          >
            <InputNumber min={0} max={20} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="note3"
            label="Third note"
          >
            <InputNumber min={0} max={20} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="efm"
            label="Note of EFM"
          >
            <InputNumber min={0} max={20} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default NoteForm
