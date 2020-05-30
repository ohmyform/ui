import {Form, Input} from 'antd'
import React from 'react'
import {FieldTypeProps} from './type.props'

export const TextareaType: React.FC<FieldTypeProps> = ({field}) => {
  return (
    <div>
      <Form.Item
        label={'Default Value'}
        name={[field.id, 'value']}
        rules={[
          { required: field.required, message: 'Please provide Information' },
        ]}
        labelCol={{ span: 6 }}
      >
        <Input.TextArea autoSize />
      </Form.Item>
    </div>
  )
}
