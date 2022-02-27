import { Form } from 'antd'
import debug from 'debug'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledNumberInput } from '../../styled/number.input'
import { FieldTypeProps } from './type.props'

const logger = debug('field/number')

export const NumberType: React.FC<FieldTypeProps> = ({ field, design, urlValue, focus }) => {
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
        rules={[
          { type: 'number', message: t('validation:invalidNumber') },
          { required: field.required, message: t('validation:valueRequired') },
        ]}
        initialValue={initialValue}
      >
        <StyledNumberInput autoFocus={focus} design={design} size={'large'} />
      </Form.Item>
    </div>
  )
}
