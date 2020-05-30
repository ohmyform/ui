import {Form, InputNumber} from 'antd'
import React from 'react'
import {FieldTypeProps} from './type.props'

export const NumberType: React.FC<FieldTypeProps> = ({field}) => {
  return (
    <div>
      <Form.Item
        label={'Default Number'}
        name={[field.id, 'value']}
        rules={[
          { type: 'number', message: 'Must be a valid URL' },
          { required: field.required, message: 'Please provide Information' },
        ]}
        labelCol={{ span: 6 }}
      >
        <InputNumber />
      </Form.Item>
    </div>
  )
}
