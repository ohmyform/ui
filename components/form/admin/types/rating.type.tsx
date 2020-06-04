import {Form, Rate} from 'antd'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {AdminFieldTypeProps} from './type.props'

export const RatingType: React.FC<AdminFieldTypeProps> = props => {
  const { t } = useTranslation()

  // TODO add ratings
  return (
    <div>
      <Form.Item
        label={t('type:rating:default')}
        name={[props.field.name, 'value']}
        labelCol={{ span: 6 }}
        extra={'Click again to remove default value'}
      >
        <Rate
          allowHalf
          allowClear
        />
      </Form.Item>
    </div>
  )
}
