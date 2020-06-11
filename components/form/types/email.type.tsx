import { Form } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledInput } from '../../styled/input'
import { FieldTypeProps } from './type.props'

export const EmailType: React.FC<FieldTypeProps> = ({ field, design }) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[
          { required: field.required, message: t('validation:valueRequired') },
          { type: 'email', message: t('validation:invalidEmail') },
        ]}
        initialValue={field.value}
      >
        <StyledInput design={design} allowClear size={'large'} />
      </Form.Item>
    </div>
  )
}
