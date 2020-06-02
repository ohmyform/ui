import {Form, Select} from 'antd'
import React, {useState} from 'react'
import {StyledSelect} from '../../styled/select'
import {FieldTypeProps} from './type.props'

export const DropdownType: React.FC<FieldTypeProps> = ({field, design}) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[
          { required: field.required, message: 'Please provide Information' },
        ]}
        initialValue={field.value || null}
      >
        <StyledSelect design={design} open={open} onBlur={() => setOpen(false)} onFocus={() => setOpen(true)} onSelect={() => setOpen(false)}>
          {field.options.filter(option => option.key === null).map(option => (
            <Select.Option value={option.value} key={option.value}>OK{option.title || option.value}</Select.Option>
          ))}
        </StyledSelect>
      </Form.Item>
    </div>
  )
}
