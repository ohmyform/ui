import {Form, InputNumber} from 'antd'
import React from 'react'

interface Props {
  field: any
}

export const NumberType: React.FC<Props> = props => {
  return (
    <div>
      <Form.Item
        label={'Default Number'}
        name={[props.field.name, 'value']}
        labelCol={{ span: 6 }}
      >
        <InputNumber />
      </Form.Item>
    </div>
  )
}
