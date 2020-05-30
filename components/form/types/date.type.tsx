import {Form} from 'antd'
import moment from 'moment'
import React from 'react'
import {StyledDateInput} from '../../styled/date.input'
import {FieldTypeProps} from './type.props'

export const DateType: React.FC<FieldTypeProps> = ({field, design}) => {
  // TODO check min and max

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[
          { required: field.required, message: 'Please provide Information' },
        ]}
      >
        <StyledDateInput
          size={'large'}
          defaultValue={field.value ? moment(field.value) : undefined}
          design={design}
          autoFocus
        />
      </Form.Item>
    </div>
  )
}
