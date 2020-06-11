import { Form, Rate } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldTypeProps } from './type.props'

export const RatingType: React.FC<FieldTypeProps> = ({ field }) => {
  const { t } = useTranslation()
  // TODO add ratings

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={parseFloat(field.value)}
      >
        <Rate allowHalf />
      </Form.Item>
    </div>
  )
}
