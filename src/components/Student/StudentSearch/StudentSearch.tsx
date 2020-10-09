import React, { FC, useEffect, useState } from 'react'
import { AutoComplete, Button, Input, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

import { Student } from '../../../generated/graphql'

interface ClassSearchProps {
  students: Student[]
  onSearch: (name: string) => void
  onShowForm: () => void
}

const StudentSearch: FC<ClassSearchProps> = props => {
  const { students, onSearch, onShowForm } = props

  const [options, setOptions] = useState<{ value: string }[]>([])

  useEffect(() => {
    const options: { value: string }[] = []
    students.forEach(student => options.push({
      value: student.fullName
    }))
    setOptions(options)
  }, [students])

  return (
    <div className='student-search'>
      <Typography.Title level={5}>
        Students
      </Typography.Title>
      <div>
        <Button
          type='primary'
          icon={<PlusCircleOutlined />}
          onClick={onShowForm}
        >
          Add Student
        </Button>
        <AutoComplete
          style={{ width: 300 }}
          options={options}
          onChange={onSearch}
          filterOption={(inputValue, option) =>
            option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input.Search placeholder="Search by student name" />
        </AutoComplete>
      </div>
    </div>
  )
}

export default StudentSearch
