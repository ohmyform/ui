import {Form, Input} from 'antd'
import React from 'react'
import {AdminFieldTypeProps} from './type.props'

export const YesNoType: React.FC<AdminFieldTypeProps> = props => {
  // TODO add switch
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
