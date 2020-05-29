import {Form, Input} from 'antd'
import React from 'react'

interface Props {
  field: any
}

export const DateType: React.FC<Props> = props => {
  return (
    <div>
      <Form.Item
        label={'Default Date'}
        name={[props.field.name, 'value']}
        labelCol={{ span: 6 }}
      >
        <Input type={'date'} />
      </Form.Item>
      <Form.Item
        label={'Min Date'}
        name={[props.field.name, 'value']}
        labelCol={{ span: 6 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={'Max Date'}
        name={[props.field.name, 'value']}
        labelCol={{ span: 6 }}
      >
        <Input />
      </Form.Item>
    </div>
  )
}
