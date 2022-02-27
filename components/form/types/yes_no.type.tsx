import { Form, Switch } from 'antd'
import debug from 'debug'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldTypeProps } from './type.props'

const logger = debug('field/link')

export const YesNoType: React.FC<FieldTypeProps> = ({ field, urlValue }) => {
  const { t } = useTranslation()


  let initialValue: boolean = undefined

  if (field.defaultValue) {
    try {
      initialValue = JSON.parse(field.defaultValue)
    } catch (e) {
      logger('invalid default value %O', e)
    }
  }

  if (urlValue !== undefined) {
    initialValue = !!urlValue
  }

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={initialValue}
        valuePropName={'checked'}
      >
        <Switch />
      </Form.Item>
    </div>
  )
}
