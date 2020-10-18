import React, { FC, useEffect, useState } from 'react'
import { Cascader, Spin } from 'antd'
import { CascaderOptionType, CascaderValueType } from 'antd/lib/cascader'

import { Formation } from '../../../generated/graphql'

interface SelectClassProps {
  fetchFormationsWithClasses: () => void
  formationsWithClasses: Formation[]
  loading: boolean
  onSelect: (formationId?: string, classId?: string) => void
}

const SelectClass: FC<SelectClassProps> = props => {
  const { fetchFormationsWithClasses, formationsWithClasses, loading, onSelect } = props

  const [options, setOptions] = useState<CascaderOptionType[]>([])

  useEffect(() => {
    fetchFormationsWithClasses()
  }, [fetchFormationsWithClasses])

  useEffect(() => {
    setOptions(getOptions(formationsWithClasses))
  }, [formationsWithClasses])

  const onChange = (value: CascaderValueType) => {
    onSelect(value[0]?.toString(), value[1]?.toString())
  }

  const filter = (inputValue: string, path: CascaderOptionType[]) => {
    return path.some(option => ((option?.label) as string)
      .toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
  }

  let cascader = (
    <Cascader
      size='large'
      style={{ width: '100%' }}
      placeholder="Please select the class"
      options={options}
      onChange={onChange}
      showSearch={{ filter }}
    />
  )

  return (
    <div className='select-class'>
      {loading ? <Spin>{cascader}</Spin> : cascader}
    </div>
  )
}

export default SelectClass

const getOptions = (formations: Formation[]): CascaderOptionType[] => {
  const options: CascaderOptionType[] = []
  formations.forEach(formation => {
    if (!formation.classes.length) return
    const option: CascaderOptionType = {
      value: formation.id,
      label: formation.name,
      children: formation.classes.map(c => ({
        value: c.id,
        label: `${c.year} Year, Group: ${c.group}`
      }))
    }
    options.push(option)
  })
  return options
}
