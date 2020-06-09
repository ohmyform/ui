import { Form } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import { StyledDateInput } from '../../styled/date.input'
import { FieldTypeProps } from './type.props'

export const DateType: React.FC<FieldTypeProps> = ({ field, design }) => {
  const [min, setMin] = useState<Dayjs>()
  const [max, setMax] = useState<Dayjs>()

  useEffect(() => {
    field.options.forEach((option) => {
      if (option.key === 'min') {
        setMin(dayjs(option.value))
      }
      if (option.key === 'max') {
        setMax(dayjs(option.value))
      }
    })
  }, [field])

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: 'Please provide Information' }]}
        getValueFromEvent={(e: Moment) => e.format('YYYY-MM-DD')}
        getValueProps={(e: string) => ({ value: e ? moment(e) : undefined })}
        initialValue={field.value ? moment(field.value) : undefined}
      >
        <StyledDateInput
          size={'large'}
          design={design}
          disabledDate={(d: Moment) => {
            if (min && min.isAfter(d.toDate())) {
              return true
            }
            if (max && max.isBefore(d.toDate())) {
              return true
            }
            return false
          }}
        />
      </Form.Item>
    </div>
  )
}
