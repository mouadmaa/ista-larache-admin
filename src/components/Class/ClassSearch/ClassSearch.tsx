import React, { FC, useState } from 'react'
import { Button, Select, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

import { Formation } from '../../../generated/graphql'

interface ClassSearchProps {
  formations: Formation[]
  onSearch: (name: string) => void
  onShowForm: () => void
}

const ClassSearch: FC<ClassSearchProps> = props => {
  const { formations, onSearch, onShowForm } = props

  const [value, setValue] = useState<string>()

  const handleChange = (value: string) => {
    setValue(value)
    onSearch(value)
  }

  return (
    <div className='class-search'>
      <Typography.Title level={5}>
        Classes
      </Typography.Title>
      <div>
        <Button
          type='primary'
          icon={<PlusCircleOutlined />}
          onClick={onShowForm}
        >
          Add Class
        </Button>
        <Select
          style={{ width: 300 }}
          value={value}
          onChange={handleChange}
          placeholder='Filter by with formation name'
          showArrow={false}
          showSearch
          allowClear
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {formations.map(formation => (
            <Select.Option key={formation.id} value={formation.name}>
              {formation.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  )
}

export default ClassSearch
