import {DatePicker, Form} from 'antd'
import moment from 'moment'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {AdminFieldTypeProps} from './type.props'

export const DateType: React.FC<AdminFieldTypeProps> = ({field, form}) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:date.default')}
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
        label={t('type:date.min')}
        name={[field.name, 'optionKeys', 'min']}
        labelCol={{ span: 6 }}
        getValueFromEvent={e => e.format('YYYY-MM-DD')}
        getValueProps={e => ({value: e ? moment(e) : undefined})}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label={t('type:date.max')}
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
