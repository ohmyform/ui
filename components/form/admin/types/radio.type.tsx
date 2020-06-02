import {Button, Col, Form, Input, Row} from 'antd'
import React from 'react'
import {AdminFieldTypeProps} from './type.props'

export const RadioType: React.FC<AdminFieldTypeProps> = props => {
  return (
    <div>
      <Form.Item
        label={'Default Value'}
        name={[props.field.name, 'value']}
        labelCol={{ span: 6 }}
      >
        <Input />
      </Form.Item>

      <Form.List
        name={[props.field.name, 'options']}
      >
        {(fields, { add, remove }) => {

          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  wrapperCol={{
                    sm: { offset: index === 0 ? 0 : 6 },
                  }}
                  labelCol={{ span: 6 }}
                  label={index === 0 ? 'Options' : ''}
                  key={field.key}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        wrapperCol={{ span: 24 }}
                        name={[field.name, 'title']}
                        style={{marginBottom: 0}}
                      >
                        <Input placeholder={'Title'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        wrapperCol={{ span: 24 }}
                        name={[field.name, 'value']}
                        style={{marginBottom: 0}}
                        rules={[
                          { required: true, message: 'Please provide a value' }
                        ]}
                      >
                        <Input placeholder={'Value'} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button danger onClick={() => remove(index)}>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              ))}

              <Form.Item
                wrapperCol={{
                  sm: { offset: 6 },
                }}
                labelCol={{ span: 6 }}
              >
                <Button
                  type={'dashed'}
                  onClick={() => add()}
                >Add Option</Button>
              </Form.Item>
            </div>
          )
        }}
      </Form.List>
    </div>
  )
}
