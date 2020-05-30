import {Form} from 'antd'
import moment from 'moment'
import React from 'react'
import {StyledDateInput} from '../../styled/date.input'
import {FieldTypeProps} from './type.props'

export const DateType: React.FC<FieldTypeProps> = ({ field, design}) => {
  // TODO check min and max
  // TODO if default is passed, then the changing should not be required

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[
          { required: field.required, message: 'Please provide Information' },
        ]}
        getValueFromEvent={e => e.format('YYYY-MM-DD')}
        getValueProps={e => ({value: e ? moment(e) : undefined})}
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
