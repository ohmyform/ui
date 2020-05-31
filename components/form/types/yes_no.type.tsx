import {Form, Switch} from 'antd'
import React from 'react'
import {FieldTypeProps} from './type.props'

export const YesNoType: React.FC<FieldTypeProps> = ({field}) => {
  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[
          { required: field.required, message: 'Please provide Information' },
        ]}
      >
        <Switch />
      </Form.Item>
    </div>
  )
}
