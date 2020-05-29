import {Form, Input} from 'antd'
import React from 'react'

interface Props {
  field: any
}

export const TextType: React.FC<Props> = props => {
  return (
    <div>
      <Form.Item
        label={'Default Value'}
        name={[props.field.name, 'value']}
        labelCol={{ span: 6 }}
      >
        <Input />
      </Form.Item>
    </div>
  )
}
