import React, { FC, useState } from 'react'
import { Select, Typography } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'

import { Formation } from '../../../generated/graphql'

interface ClassSearchProps {
  formations: Formation[]
  onSearch: (name: string) => void
}

const ClassSearch: FC<ClassSearchProps> = props => {
  const { formations, onSearch } = props

  const [value, setValue] = useState('')

  const handleChange = (value: string) => {
    setValue(value)
    onSearch(value)
  }

  return (
    <div className='class-search'>
      <Typography.Title level={4}>
        Classes
      </Typography.Title>
      <Select
        style={{ width: 300 }}
        showSearch
        value={value}
        onChange={handleChange}
        placeholder='Search with formation name'
        defaultActiveFirstOption={false}
        showArrow={false}
        notFoundContent={null}
        suffixIcon={<CloseCircleOutlined />}
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
  )
}

export default ClassSearch