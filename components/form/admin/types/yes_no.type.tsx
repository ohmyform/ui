import { Form, Input } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AdminFieldTypeProps } from './type.props'

export const YesNoType: React.FC<AdminFieldTypeProps> = (props) => {
  const { t } = useTranslation()

  // TODO add switch
  return (
    <div>
      <Form.Item
        label={t('type:yes_no:default')}
        name={[props.field.name, 'value']}
        labelCol={{ span: 6 }}
      >
        <Input />
      </Form.Item>
    </div>
  )
}
