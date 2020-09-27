import React, { FC, Fragment, useEffect } from 'react'
import { Modal, Form, Select, Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

import { Class, ClassCreateInput, UpdateClassMutationVariables, Formation, User } from '../../../generated/graphql'
import { groups, years } from '../../../utils/getArrayEnum'

interface ClassFormProps {
  currentClass?: Class
  formations: Formation[]
  teachers: User[]
  visible: boolean
  loading: boolean
  onCreate: ({ variables }: { variables: ClassCreateInput }) => void
  onUpdate: ({ variables }: { variables: UpdateClassMutationVariables }) => void
  onShowForm: () => void
  onHideForm: () => void
}

const ClassForm: FC<ClassFormProps> = props => {
  const {
    currentClass, formations, teachers, visible, loading,
    onCreate, onUpdate, onShowForm, onHideForm
  } = props

  const [form] = Form.useForm()

  useEffect(() => {
    if (currentClass) {
      form.setFieldsValue({
        ...currentClass,
        formationId: currentClass.formation.id,
        teacherId: currentClass.teacher.id,
      })
    } else {
      form.setFieldsValue({
        year: years[0], group: groups[0],
        formationId: formations[0]?.id || '',
        teacherId: teachers[0]?.id || '',
      })
    }
  }, [form, currentClass, formations, teachers])

  const handleOk = async () => {
    const variables = await form.validateFields()
    variables.formation = { connect: { id: variables.formationId } }
    variables.teacher = { connect: { id: variables.teacherId } }
    if (currentClass) {
      onUpdate({ variables: { ...variables, id: currentClass.id } })
    } else {
      onCreate({ variables: variables as ClassCreateInput })
    }
    form.resetFields()
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
        title={`${currentClass ? 'Edit the' : 'Create a new'} class`}
        okText={`${currentClass ? 'Save' : 'Create'}`}
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
          <Form.Item name="formationId" label="Formation of class">
            <Select
              defaultValue={formations[0]?.id || ''}
              loading={loading}
              showSearch
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {formations.map(formation => (
                <Select.Option key={formation.id} value={formation.id}>
                  {formation.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="year" label="Year of class">
            <Select defaultValue={years[0]}>
              {years.map(year => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="group" label="Group of class">
            <Select defaultValue={groups[0]}>
              {groups.map(group => (
                <Select.Option key={group} value={group}>
                  {group}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="teacherId" label="Teacher of class">
            <Select
              defaultValue={teachers[0]?.id || ''}
              loading={loading}
              showSearch
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {teachers.map(teacher => (
                <Select.Option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default ClassForm
