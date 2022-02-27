import { Form, Radio } from 'antd'
import debug from 'debug'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledRadio } from '../../styled/radio'
import { FieldTypeProps } from './type.props'

const logger = debug('field/radio')

export const RadioType: React.FC<FieldTypeProps> = ({ field, design, urlValue }) => {
  const { t } = useTranslation()

  let initialValue: string = undefined

  if (field.defaultValue) {
    try {
      initialValue = JSON.parse(field.defaultValue)
    } catch (e) {
      logger('invalid default value %O', e)
    }
  }

  if (urlValue) {
    initialValue = urlValue
  }

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={field.options
          .map((option) => option.value)
          .find((value) => value === initialValue)}
      >
        <Radio.Group>
          {field.options
            .filter((option) => option.key === null)
            .map((option) => (
              <StyledRadio design={design} value={option.value} key={option.value}>
                {option.title || option.value}
              </StyledRadio>
            ))}
        </Radio.Group>
      </Form.Item>
    </div>
  )
}
