import {Form, Rate} from 'antd'
import React from 'react'
import {AdminFieldTypeProps} from './type.props'

export const RatingType: React.FC<AdminFieldTypeProps> = props => {
  // TODO add ratings
  return (
    <div>
      <Form.Item
        label={'Default Value'}
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
