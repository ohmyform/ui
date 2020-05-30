import {Form} from 'antd'
import React from 'react'
import {StyledInput} from '../../styled/input'
import {FieldTypeProps} from './type.props'

export const LinkType: React.FC<FieldTypeProps> = ({field, design}) => {
  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[
          { required: field.required, message: 'Please provide Information' },
          { type: 'url', message: 'Must be a valid URL' }
        ]}
      >
        <StyledInput
          design={design}
          allowClear
          size={'large'}
          defaultValue={field.value}
        />
      </Form.Item>
    </div>
  )
}
