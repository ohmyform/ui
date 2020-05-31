import {Form, Input} from 'antd'
import React from 'react'
import {FieldTypeProps} from './type.props'

export const RadioType: React.FC<FieldTypeProps> = ({field}) => {
  // TODO Add radio support

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[
          { required: field.required, message: 'Please provide Information' },
        ]}
      >
        <Input />
      </Form.Item>
    </div>
  )
}
