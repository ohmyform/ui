import { DeleteOutlined, PlusOutlined } from '@ant-design/icons/lib'
import { Button, Card, Checkbox, Form, Input, Popconfirm, Popover, Select, Space, Tabs, Tag } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { TabPaneProps } from 'antd/lib/tabs'
import { FieldData } from 'rc-field-form/lib/interface'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AdminFormFieldFragment } from '../../../graphql/fragment/admin.form.fragment'
import { FieldCard } from './field.card'
import { adminTypes } from './types'

interface Props extends TabPaneProps {
}

export const HooksTab: React.FC<Props> = (props) => {
  const { t } = useTranslation()

  return (
    <Tabs.TabPane {...props}>
      <Form.List name={['form', 'hooks']}>
        {(hooks, { add, remove, move }) => {
          return (
            <div>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Space
                  style={{
                    width: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    type="dashed"
                    onClick={() => {
                      const defaults = {
                        id: `NEW-${Date.now()}`,
                        enabled: false,
                        url: ''
                      }

                      add(defaults)
                    }}
                  >
                    <PlusOutlined /> {t('form:hooks.add')}
                  </Button>
                </Space>
              </Form.Item>
              {hooks.map((hook, index) => (
                <div key={hook.key}>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Card
                      title={
                        <Form.Item
                          name={[hook.name, 'enabled']}
                          valuePropName={'checked'}
                          noStyle
                        >
                          <Checkbox /> {t('form:hooks.enabled')}
                        </Form.Item>
                      }
                      type={'inner'}
                      extra={
                        <div>
                          <Popconfirm
                            placement={'left'}
                            title={t('form:hooks.confirmDelete')}
                            okText={t('form:hooks.deleteNow')}
                            okButtonProps={{ danger: true }}
                            onConfirm={() => {
                              remove(index)
                            }}
                          >
                            <Button danger>
                              <DeleteOutlined />
                            </Button>
                          </Popconfirm>
                        </div>
                      }
                      actions={[<DeleteOutlined key={'delete'} onClick={() => remove(index)} />]}
                    >
                      <Form.Item
                        label={t('form:hooks.url')}
                        name={[hook.name, 'url']}
                        rules={[
                          { required: true, message: t('validation:urlRequired') },
                          { type: 'url', message: t('validation:invalidUrl')},
                        ]}
                        labelCol={{ span: 6 }}
                      >
                        <Input  />
                      </Form.Item>
                    </Card>
                  </Form.Item>
                </div>
              ))}
            </div>
          )
        }}
      </Form.List>
    </Tabs.TabPane>
  )
}
