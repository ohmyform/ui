import { Form } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledTextareaInput } from '../../styled/textarea.input'
import { FieldTypeProps } from './type.props'

export const TextareaType: React.FC<FieldTypeProps> = ({ field, design, urlValue }) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={urlValue || field.value}
      >
        <StyledTextareaInput design={design} allowClear autoSize />
      </Form.Item>
    </div>
  )
}
