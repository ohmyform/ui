import {Form, Input} from 'antd'
import React from 'react'
import {AdminFieldTypeProps} from './type.props'

export const TextareaType: React.FC<AdminFieldTypeProps> = props => {
  return (
    <div>
      <Form.Item
        label={'Default Value'}
        name={[props.field.name, 'value']}
        labelCol={{ span: 6 }}
      >
        <Input.TextArea autoSize />
      </Form.Item>
    </div>
  )
}
