import {Form, Input} from 'antd'
import React from 'react'

interface Props {
  field: any
}

export const RatingType: React.FC<Props> = props => {
  // TODO add ratings

  return (
    <div>
      <Form.Item
        label={'Default Value'}
        name={[props.field.name, 'value']}
        labelCol={{ span: 6 }}
      >
        <Input />
      </Form.Item>
    </div>
  )
}
