import {DatePicker, Form} from 'antd'
import React from 'react'
import {FieldTypeProps} from './type.props'

export const DateType: React.FC<FieldTypeProps> = ({field}) => {
  // TODO check min and max

  return (
    <div>
      <Form.Item
        label={'Default Date'}
        name={[field.id, 'value']}
        rules={[
          { required: field.required, message: 'Please provide Information' },
        ]}
        labelCol={{ span: 6 }}
      >
        <DatePicker autoFocus />
      </Form.Item>
    </div>
  )
}
