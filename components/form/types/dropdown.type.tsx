import { Form, Select } from 'antd'
import debug from 'debug'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledSelect } from '../../styled/select'
import { FieldTypeProps } from './type.props'

const logger = debug('field/dropdown')

export const DropdownType: React.FC<FieldTypeProps> = ({ field, design, urlValue, focus }) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  let initialValue = null

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
        initialValue={initialValue}
      >
        <StyledSelect
          autoFocus={focus}
          design={design}
          open={open}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onSelect={() => setOpen(false)}
        >
          {field.options
            .filter((option) => option.key === null)
            .map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.title || option.value}
              </Select.Option>
            ))}
        </StyledSelect>
      </Form.Item>
    </div>
  )
}
