import React, { FC, useState } from 'react'
import { Button, Upload, Image, message, Row, Col } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import './Timetable.css'
import SelectClass from '../../components/Class/SelectClass/SelectClass'
import { Class } from '../../generated/graphql'
import { getImageBase64 } from '../../utils/getImageBase64'
import { useFormation } from '../../hooks/useFormationHook'
import { useClass } from '../../hooks/useClassHook'

const Timetable: FC = () => {
  const [file, setFile] = useState<any>()
  const [currentClass, setCurrentClass] = useState<Class>()

  const { updateClass, formLoading, classesLoading } = useClass()
  const {
    fetchFormationsWithClasses, formationsWithClasses, formationsWithClassesLoading,
  } = useFormation()

  const onSelectClass = (formationId?: string, classId?: string) => {
    const formation = formationsWithClasses.find(f => f.id === formationId)
    const currentClass = formation?.classes.find(c => c.id === classId)
    setCurrentClass(currentClass)
  }

  const handleUpload = async () => {
    const { data, errors } = await updateClass({
      variables: {
        id: currentClass?.id as string,
        timetable: currentClass?.timetable,
        file: await getImageBase64(file) as string
      }
    })

    if (errors) message.error('Upload image failed.')
    if (data?.updateClass) setCurrentClass(data.updateClass as Class)
    onRemove()
  }

  const handleDelete = async () => {
    const { data, errors } = await updateClass({
      variables: {
        id: currentClass?.id as string,
        timetable: currentClass?.timetable,
      }
    })

    if (errors) message.error('Delete image failed.')
    if (data?.updateClass) setCurrentClass(data.updateClass as Class)
    onRemove()
  }

  const beforeUpload = (file: any) => {
    setFile(file)
    return false
  }

  const onRemove = () => setFile(undefined)

  return (
    <div className='timetable-container'>
      <SelectClass
        fetchFormationsWithClasses={fetchFormationsWithClasses}
        formationsWithClasses={formationsWithClasses}
        loading={formationsWithClassesLoading}
        onSelect={onSelectClass}
      />
      <Row align='middle' justify='space-around'>
        <Col span={16}>
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
        </Col>
        <Col span={2}>
          {currentClass && (
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={!file}
              loading={formLoading}
            >
              {formLoading ? 'Uploading...' : 'Start Upload'}
            </Button>
          )}
        </Col>
        <Col span={3}>
          {currentClass?.timetable && (
            <Button
              type="primary"
              onClick={handleDelete}
              loading={classesLoading}
            >
              {classesLoading ? 'Deleting...' : 'Delete Timetable'}
            </Button>
          )}
        </Col>
      </Row>
      {currentClass?.timetable && (
        <div className='image'>
          <Image
            width='100%'
            height={500}
            src={currentClass.timetable}
          />
        </div>
      )}
    </div>
  )
}

export default Timetable
