import {DatePicker, Form} from 'antd'
import moment from 'moment'
import React from 'react'
import {AdminFieldTypeProps} from './type.props'

export const DateType: React.FC<AdminFieldTypeProps> = ({field, form}) => {
  return (
    <div>
      <Form.Item
        label={'Default Date'}
        name={[field.name, 'value']}
        labelCol={{ span: 6 }}
        getValueFromEvent={e => e ? e.format('YYYY-MM-DD') : undefined}
        getValueProps={e => ({value: e ? moment(e) : undefined})}
      >
        <DatePicker
          format={'YYYY-MM-DD'}
        />
      </Form.Item>
      <Form.Item
        label={'Min Date'}
        name={[field.name, 'optionKeys', 'min']}
        labelCol={{ span: 6 }}
        getValueFromEvent={e => e.format('YYYY-MM-DD')}
        getValueProps={e => ({value: e ? moment(e) : undefined})}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label={'Max Date'}
        name={[field.name, 'optionKeys', 'max']}
        labelCol={{ span: 6 }}
        getValueFromEvent={e => e.format('YYYY-MM-DD')}
        getValueProps={e => ({value: e ? moment(e) : undefined})}
      >
        <DatePicker />
      </Form.Item>
    </div>
  )
}
