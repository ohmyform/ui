import { DeleteOutlined, PlusOutlined } from '@ant-design/icons/lib'
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Popconfirm,
  Popover,
  Space,
  Tag,
  Tooltip,
} from 'antd'
import { FormInstance } from 'antd/lib/form'
import { FieldData } from 'rc-field-form/lib/interface'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormFieldFragment, FormFieldLogicFragment } from '../../../graphql/fragment/form.fragment'
import { LogicBlock } from './logic.block'
import { adminTypes } from './types'
import { TextType } from './types/text.type'

interface Props {
  form: FormInstance
  fields: FormFieldFragment[]
  onChangeFields: (fields: FormFieldFragment[]) => void
  field: FieldData
  remove: (index: number) => void
  index: number
}

export const FieldCard: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const { form, field, fields, onChangeFields, remove, index } = props

  const type = form.getFieldValue(['form', 'fields', field.name as string, 'type']) as string
  const TypeComponent = adminTypes[type] || TextType

  const [nextTitle, setNextTitle] = useState<string>(
    form.getFieldValue(['form', 'fields', field.name as string, 'title'])
  )

  useEffect(() => {
    const id = setTimeout(() => {
      onChangeFields(
        fields.map((field, i) => {
          if (i === index) {
            return {
              ...field,
              title: nextTitle,
            }
          } else {
            return field
          }
        })
      )
    }, 500)

    return () => clearTimeout(id)
  }, [nextTitle])

  const addLogic = useCallback((add: (defaults: unknown) => void, index: number) => {
    return (
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
              const defaults: FormFieldLogicFragment = {
                id: `NEW-${Date.now()}`,
                formula: null,
                action: null,
                jumpTo: null,
                visible: null,
                disable: null,
                require: null,
                enabled: false,
              }

              add(defaults)
            }}
          >
            <PlusOutlined /> {t('form:logic.add')}
          </Button>
        </Space>
      </Form.Item>
    )
  }, [])

  return (
    <Card
      title={<Tooltip title={`@${field.name as string}`}>nextTitle</Tooltip>}
      type={'inner'}
      extra={
        <div>
          <Form.Item noStyle shouldUpdate>
            {() => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const slug = form.getFieldValue(['form', 'fields', field.name as string, 'slug'])

              if (!slug) {
                return null
              }

              return <Tag color={'warning'}>Slug: {slug}</Tag>
            }}
          </Form.Item>
          <Popover
            placement={'left'}
            content={
              <Form.Item
                name={[field.name as string, 'slug']}
                label={false}
                rules={[
                  {
                    pattern: /^[a-z0-9_]+$/,
                    message: t('validation:invalidSlug'),
                  },
                ]}
                help={t('type:slugInfo')}
              >
                <Input />
              </Form.Item>
            }
            title={t('type:slug')}
          >
            <Tag color={'blue'}>{t(`type:${type}.name`)}</Tag>
          </Popover>
          <Popconfirm
            placement={'left'}
            title={t('type:confirmDelete')}
            okText={t('type:deleteNow')}
            okButtonProps={{ danger: true }}
            onConfirm={() => {
              remove(index)
              onChangeFields(fields.filter((e, i) => i !== index))
            }}
          >
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      }
    >
      <Form.Item name={[field.name as string, 'type']} noStyle>
        <Input type={'hidden'} />
      </Form.Item>
      <Form.Item
        label={t('type:title')}
        name={[field.name as string, 'title']}
        rules={[{ required: true, message: 'Title is required' }]}
        labelCol={{ span: 6 }}
      >
        <Input onChange={(e) => setNextTitle(e.target.value)} />
      </Form.Item>
      <Form.Item
        label={t('type:description')}
        name={[field.name as string, 'description']}
        labelCol={{ span: 6 }}
        extra={t('type:descriptionInfo')}
      >
        <Input.TextArea autoSize />
      </Form.Item>
      <Form.Item
        label={t('type:required')}
        name={[field.name as string, 'required']}
        labelCol={{ span: 6 }}
        valuePropName={'checked'}
        extra={type === 'hidden' && t('type:requiredInfo')}
      >
        <Checkbox />
      </Form.Item>

      <TypeComponent field={field} form={form} />

      <Form.List name={[field.name as string, 'logic']}>
        {(logic, { add, remove, move }) => {
          const addAndMove = (index) => (defaults) => {
            add(defaults)
            move(fields.length, index)
          }

          return (
            <div>
              {addLogic(addAndMove(0), 0)}
              {logic.map((field, index) => (
                <div key={field.key}>
                  <Form.Item wrapperCol={{ span: 24 }} noStyle>
                    <LogicBlock
                      field={field}
                      form={form}
                      fields={fields}
                      index={index}
                      remove={remove}
                    />
                  </Form.Item>
                  {addLogic(addAndMove(index + 1), index + 1)}
                </div>
              ))}
            </div>
          )
        }}
      </Form.List>
    </Card>
  )
}
