import {DatePicker, Form} from 'antd'
import React from 'react'
import {AdminFieldTypeProps} from './type.props'

export const DateType: React.FC<AdminFieldTypeProps> = props => {
  return (
    <div>
      <Form.Item
        label={'Default Date'}
        name={[props.field.name, 'value']}
        labelCol={{ span: 6 }}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label={'Min Date'}
        name={[props.field.name, 'min']}
        labelCol={{ span: 6 }}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label={'Max Date'}
        name={[props.field.name, 'max']}
        labelCol={{ span: 6 }}
      >
        <DatePicker />
      </Form.Item>
    </div>
  )
}
