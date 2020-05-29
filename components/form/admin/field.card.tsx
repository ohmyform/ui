import {DeleteOutlined} from '@ant-design/icons/lib'
import {Button, Card, Checkbox, Form, Input, Popconfirm, Tag} from 'antd'
import {FormInstance} from 'antd/lib/form'
import {FieldData} from 'rc-field-form/lib/interface'
import React, {useEffect, useState} from 'react'
import {AdminFormFieldFragment} from '../../../graphql/fragment/admin.form.fragment'
import {DateType} from './types/date.type'
import {DropdownType} from './types/dropdown.type'
import {EmailType} from './types/email.type'
import {HiddenType} from './types/hidden.type'
import {LinkType} from './types/link.type'
import {NumberType} from './types/number.type'
import {RadioType} from './types/radio.type'
import {RatingType} from './types/rating.type'
import {TextType} from './types/text.type'
import {TextareaType} from './types/textarea.type'
import {YesNoType} from './types/yes_no.type'

export const availableTypes = {
  'textfield': TextType,
  'date': DateType,
  'email': EmailType,
  'textarea': TextareaType,
  'link': LinkType,
  'dropdown': DropdownType,
  'rating': RatingType,
  'radio': RadioType,
  'hidden': HiddenType,
  'yes_no': YesNoType,
  'number': NumberType,
}

interface Props {
  form: FormInstance
  fields: AdminFormFieldFragment[]
  onChangeFields: (fields: AdminFormFieldFragment[]) => any
  field: FieldData
  remove: (index: number) => void
  index: number
}

export const FieldCard: React.FC<Props> = props => {
  const {
    form,
    field,
    fields,
    onChangeFields,
    remove,
    index,
  } = props

  const type = form.getFieldValue(['form', 'fields', field.name as string, 'type'])
  const TypeComponent: React.FC<any> = availableTypes[type] || TextType

  const [nextTitle, setNextTitle] = useState(form.getFieldValue(['form', 'fields', field.name as string, 'title']))

  useEffect(() => {
    const id = setTimeout(() => {
      console.log('update fields')
      onChangeFields(fields.map((field, i) => {
        if (i === index) {
          return {
            ...field,
            title: nextTitle,
          }
        } else {
          return field
        }
      }))
    }, 500)

    return () => clearTimeout(id)
  }, [nextTitle])

  return (
    <Card
      title={nextTitle}
      type={'inner'}
      extra={(
        <div>
          <Tag color={'blue'}>{type}</Tag>
          <Popconfirm
            placement={'left'}
            title={'Really remove this field? Check that it is not referenced anywhere!'}
            okText={'Delete Field'}
            okButtonProps={{ danger: true }}
            onConfirm={() => {
              remove(index)
              onChangeFields(fields.filter((e, i) => i !== index))
            }}
          >
            <Button danger><DeleteOutlined /></Button>
          </Popconfirm>
        </div>
      )}
      actions={[
        <DeleteOutlined key={'delete'} onClick={() => remove(index)} />
      ]}
    >
      <Form.Item name={[field.name as string, 'type']} noStyle><Input type={'hidden'} /></Form.Item>
      <Form.Item
        label={'Title'}
        name={[field.name as string, 'title']}
        rules={[
          { required: true, message: 'Title is required' }
        ]}
        labelCol={{ span: 6 }}
      >
        <Input onChange={e => setNextTitle(e.target.value)}/>
      </Form.Item>
      <Form.Item
        label={'Description'}
        name={[field.name as string, 'description']}
        labelCol={{ span: 6 }}
      >
        <Input.TextArea autoSize />
      </Form.Item>
      <Form.Item
        label={'Required'}
        name={[field.name as string, 'required']}
        labelCol={{ span: 6 }}
        valuePropName={'checked'}
      >
        <Checkbox />
      </Form.Item>

      <TypeComponent field={field} />
    </Card>
  )
}
