import { Form, Switch } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AdminFieldTypeProps } from './type.props'

export const YesNoType: React.FC<AdminFieldTypeProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Form.Item
        label={t('type:yes_no:default')}
        name={[props.field.name as string, 'defaultValue']}
        labelCol={{ span: 6 }}
        valuePropName={'checked'}
      >
        <Switch />
      </Form.Item>
    </div>
  )
}
