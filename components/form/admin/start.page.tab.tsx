import {DeleteOutlined, PlusOutlined} from '@ant-design/icons/lib'
import {Button, Card, Form, Input, Switch, Tabs} from 'antd'
import {TabPaneProps} from 'antd/lib/tabs'
import React from 'react'
import {InputColor} from '../../input/color'

export const StartPageTab: React.FC<TabPaneProps> = props => {
  return (
    <Tabs.TabPane {...props}>
      <Form.Item
        label={'Show'}
        name={['form', 'startPage', 'show']}
        valuePropName={'checked'}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label={'Title'}
        name={['form', 'startPage', 'title']}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={'Paragraph'}
        name={['form', 'startPage', 'paragraph']}
      >
        <Input.TextArea autoSize />
      </Form.Item>

      <Form.Item
        label={'Continue Button Text'}
        name={['form', 'startPage', 'buttonText']}
      >
        <Input />
      </Form.Item>

      <Form.List
        name={['form', 'startPage', 'buttons']}
      >
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                  <Form.Item
                    wrapperCol={{
                      sm: { offset: index === 0 ? 0 : 6 },
                    }}
                    label={index === 0 ? 'Buttons' : ''}
                    key={field.key}
                  >
                    <Card
                      actions={[
                        <DeleteOutlined key={'delete'} onClick={() => remove(index)} />
                      ]}
                    >
                      <Form.Item label={'Url'} name={[field.key, 'url']} labelCol={{ span: 6 }}>
                        <Input />
                      </Form.Item>
                      <Form.Item label={'Action'} name={[field.key, 'action']} labelCol={{ span: 6 }}>
                        <Input />
                      </Form.Item>
                      <Form.Item label={'Text'} name={[field.key, 'text']} labelCol={{ span: 6 }}>
                        <Input />
                      </Form.Item>
                      <Form.Item label={'Background Color'} name={[field.key, 'bgColor']} labelCol={{ span: 6 }}>
                        <InputColor />
                      </Form.Item>
                      <Form.Item label={'Color'} name={[field.key, 'color']} labelCol={{ span: 6 }}>
                        <InputColor />
                      </Form.Item>
                    </Card>
                  </Form.Item>
                )
              )}
              <Form.Item
                wrapperCol={{
                  sm: { offset: 6 },
                }}
              >
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined /> Add Button
                </Button>
              </Form.Item>
            </div>
          )
        }}
      </Form.List>
    </Tabs.TabPane>
  )
}
