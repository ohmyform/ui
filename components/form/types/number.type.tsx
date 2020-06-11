import { Form } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledNumberInput } from '../../styled/number.input'
import { FieldTypeProps } from './type.props'

export const NumberType: React.FC<FieldTypeProps> = ({ field, design }) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[
          { type: 'number', message: t('validation:invalidNumber') },
          { required: field.required, message: t('validation:valueRequired') },
        ]}
        initialValue={typeof field.value === 'number' ? parseFloat(field.value) : undefined}
      >
        <StyledNumberInput design={design} size={'large'} />
      </Form.Item>
    </div>
  )
}
