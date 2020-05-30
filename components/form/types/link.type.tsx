import {Form, Input} from 'antd'
import React from 'react'
import {FieldTypeProps} from './type.props'

export const LinkType: React.FC<FieldTypeProps> = ({field}) => {
  return (
    <div>
      <Form.Item
        label={'Default Link'}
        name={[field.id, 'value']}
        rules={[
          { required: field.required, message: 'Please provide Information' },
          { type: 'url', message: 'Must be a valid URL' }
        ]}
        labelCol={{ span: 6 }}
      >
        <Input type={'url'} />
      </Form.Item>
    </div>
  )
}
