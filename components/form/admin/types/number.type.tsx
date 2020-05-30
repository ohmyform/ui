import {Form, InputNumber} from 'antd'
import React from 'react'
import {AdminFieldTypeProps} from './type.props'

export const NumberType: React.FC<AdminFieldTypeProps> = props => {
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
