import { Form } from 'antd'
import React from 'react'
import { StyledTextareaInput } from '../../styled/textarea.input'
import { FieldTypeProps } from './type.props'

export const TextareaType: React.FC<FieldTypeProps> = ({ field, design }) => {
  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: 'Please provide Information' }]}
        initialValue={field.value}
      >
        <StyledTextareaInput design={design} allowClear autoSize />
      </Form.Item>
    </div>
  )
}
