import {Form, Input} from 'antd'
import React from 'react'
import {AdminFieldTypeProps} from './type.props'

export const TextType: React.FC<AdminFieldTypeProps> = props => {
  return (
    <Form.Item
      label={'Default Value'}
      name={[props.field.name, 'value']}
      labelCol={{ span: 6 }}
    >
      <Input />
    </Form.Item>
  )
}
