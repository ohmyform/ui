import {Form, Input} from 'antd'
import React from 'react'
import {FieldTypeProps} from './type.props'

export const EmailType: React.FC<FieldTypeProps> = ({field}) => {
  return (
    <div>
      <Form.Item
        label={'Default Email'}
        name={[field.id, 'value']}
        rules={[
          { required: field.required, message: 'Please provide Information' },
          { type: 'email', message: 'Must be a valid email' }
        ]}
        labelCol={{ span: 6 }}
      >
        <Input type={'email'} />
      </Form.Item>
    </div>
  )
}
