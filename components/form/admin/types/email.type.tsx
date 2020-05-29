import {Form, Input} from 'antd'
import React from 'react'

interface Props {
  field: any
}

export const EmailType: React.FC<Props> = props => {
  return (
    <div>
      <Form.Item
        label={'Default Email'}
        name={[props.field.name, 'value']}
        rules={[
          { type: 'email', message: 'Must be a valid email' }
        ]}
        labelCol={{ span: 6 }}
      >
        <Input type={'email'} />
      </Form.Item>
    </div>
  )
}
