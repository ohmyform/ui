import { Form } from 'antd'
import React from 'react'
import { StyledInput } from '../../styled/input'
import { FieldTypeProps } from './type.props'

export const TextType: React.FC<FieldTypeProps> = ({ field, design }) => {
  // TODO focus when becomes visible

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: 'Please provide Information' }]}
        initialValue={field.value}
      >
        <StyledInput design={design} allowClear size={'large'} />
      </Form.Item>
    </div>
  )
}
