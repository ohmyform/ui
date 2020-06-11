import { PlusOutlined } from '@ant-design/icons/lib'
import { Button, Form, Select, Space, Tabs } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { TabPaneProps } from 'antd/lib/tabs'
import { FieldData } from 'rc-field-form/lib/interface'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AdminFormFieldFragment } from '../../../graphql/fragment/admin.form.fragment'
import { FieldCard } from './field.card'
import { adminTypes } from './types'

interface Props extends TabPaneProps {
  form: FormInstance
  fields: AdminFormFieldFragment[]
  onChangeFields: (fields: AdminFormFieldFragment[]) => void
}

export const FieldsTab: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const [nextType, setNextType] = useState('textfield')

  const renderType = useCallback(
    (field: FieldData, index: number, remove: (index: number) => void) => {
      return (
        <FieldCard
          form={props.form}
          field={field}
          index={index}
          remove={remove}
          fields={props.fields}
          onChangeFields={props.onChangeFields}
        />
      )
    },
    [props.fields]
  )

  const addField = useCallback(
    (add: (defaults: unknown) => void, index: number) => {
      return (
        <Form.Item wrapperCol={{ span: 24 }}>
          <Space
            style={{
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Select value={nextType} onChange={(e) => setNextType(e)} style={{ minWidth: 200 }}>
              {Object.keys(adminTypes).map((type) => (
                <Select.Option value={type} key={type}>
                  {t(`type:${type}.name`)}
                </Select.Option>
              ))}
            </Select>
            <Button
              type="dashed"
              onClick={() => {
                const defaults: AdminFormFieldFragment = {
                  logicJump: {
                    enabled: false,
                  },
                  options: [],
                  id: `NEW-${Date.now()}`,
                  type: nextType,
                  title: '',
                  description: '',
                  required: false,
                  value: '',
                }

                add(defaults)
                const next = [...props.fields]
                next.splice(index, 0, defaults)
                props.onChangeFields(next)
              }}
            >
              <PlusOutlined /> {t('type:add')}
            </Button>
          </Space>
        </Form.Item>
      )
    },
    [props.fields, nextType]
  )

  return (
    <Tabs.TabPane {...props}>
      <Form.List name={['form', 'fields']}>
        {(fields, { add, remove, move }) => {
          const addAndMove = (index) => (defaults) => {
            add(defaults)
            move(fields.length, index)
          }

          return (
            <div>
              {addField(addAndMove(0), 0)}
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    {renderType(field, index, remove)}
                  </Form.Item>
                  {addField(addAndMove(index + 1), index + 1)}
                </div>
              ))}
            </div>
          )
        }}
      </Form.List>
    </Tabs.TabPane>
  )
}
