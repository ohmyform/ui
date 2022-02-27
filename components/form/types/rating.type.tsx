import { Form, Rate } from 'antd'
import debug from 'debug'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldTypeProps } from './type.props'

const logger = debug('field/rating')

export const RatingType: React.FC<FieldTypeProps> = ({ field, urlValue }) => {
  const { t } = useTranslation()

  let initialValue: number = undefined

  if (field.defaultValue) {
    try {
      initialValue = JSON.parse(field.defaultValue)
    } catch (e) {
      logger('invalid default value %O', e)
    }
  }

  if (urlValue) {
    initialValue = parseFloat(urlValue)
  }

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={initialValue}
      >
        <Rate allowHalf />
      </Form.Item>
    </div>
  )
}
