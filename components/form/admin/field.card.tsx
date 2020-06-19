import { DeleteOutlined } from '@ant-design/icons/lib'
import { Button, Card, Checkbox, Form, Input, Popconfirm, Popover, Tag } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { FieldData } from 'rc-field-form/lib/interface'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AdminFormFieldFragment } from '../../../graphql/fragment/admin.form.fragment'
import { adminTypes } from './types'
import { TextType } from './types/text.type'

interface Props {
  form: FormInstance
  fields: AdminFormFieldFragment[]
  onChangeFields: (fields: AdminFormFieldFragment[]) => void
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

  return (
    <Card
      title={nextTitle}
      type={'inner'}
      extra={
        <div>
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
      actions={[<DeleteOutlined key={'delete'} onClick={() => remove(index)} />]}
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
    </Card>
  )
}
