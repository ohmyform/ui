import {Form} from 'antd'
import React from 'react'
import {StyledNumberInput} from '../../styled/number.input'
import {FieldTypeProps} from './type.props'

export const NumberType: React.FC<FieldTypeProps> = ({field, design}) => {
  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[
          { type: 'number', message: 'Must be a valid URL' },
          { required: field.required, message: 'Please provide Information' },
        ]}
        initialValue={parseFloat(field.value)}
      >
        <StyledNumberInput
          design={design}
          size={'large'}
        />
      </Form.Item>
    </div>
  )
}
