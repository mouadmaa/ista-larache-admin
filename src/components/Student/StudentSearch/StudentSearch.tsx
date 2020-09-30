import React, { FC, useEffect, useState } from 'react'
import { AutoComplete, Input, Typography } from 'antd'

import { Student } from '../../../generated/graphql'

interface ClassSearchProps {
  students: Student[]
  onSearch: (name: string) => void
}

const StudentSearch: FC<ClassSearchProps> = props => {
  const { students, onSearch } = props

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
      <Typography.Title level={4}>
        Students
      </Typography.Title>
      <span>
        <Typography.Text>
          Search by student name:
        </Typography.Text>
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
      </span>
    </div>
  )
}

export default StudentSearch
