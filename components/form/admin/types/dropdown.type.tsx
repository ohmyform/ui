import {Form, Input} from 'antd'
import React from 'react'
import {AdminFieldTypeProps} from './type.props'

export const DropdownType: React.FC<AdminFieldTypeProps> = props => {
  // TODO add dropdown options
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
