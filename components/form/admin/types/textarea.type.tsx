import {Form, Input} from 'antd'
import React from 'react'

interface Props {
  field: any
}

export const TextareaType: React.FC<Props> = props => {
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
