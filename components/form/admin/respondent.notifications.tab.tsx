import {Form, Input, Select, Switch, Tabs} from 'antd'
import {FormInstance} from 'antd/lib/form'
import {TabPaneProps} from 'antd/lib/tabs'
import React, {useEffect, useState} from 'react'
import {AdminFormFieldFragment} from '../../../graphql/fragment/admin.form.fragment'

interface Props extends TabPaneProps {
  form: FormInstance
  fields: AdminFormFieldFragment[]
}

export const RespondentNotificationsTab: React.FC<Props> = props => {
  const [enabled, setEnabled] = useState<boolean>()

  useEffect(() => {
    const next = props.form.getFieldValue(['form', 'respondentNotifications', 'enabled'])

    if (next !== enabled) {
      setEnabled(next)
    }
  }, [props.form.getFieldValue(['form', 'respondentNotifications', 'enabled'])])

  useEffect(() => {
    props.form.validateFields([
      ['form', 'respondentNotifications', 'subject'],
      ['form', 'respondentNotifications', 'htmlTemplate'],
      ['form', 'respondentNotifications', 'toField'],
    ])
  }, [enabled])

  const groups = {}

  props.fields.forEach(field => {
    if (!groups[field.type]) {
      groups[field.type] = []
    }
    groups[field.type].push(field)
  })

  return (
    <Tabs.TabPane {...props}>
      <Form.Item
        label={'Enabled'}
        name={['form', 'respondentNotifications', 'enabled']}
        valuePropName={'checked'}
      >
        <Switch onChange={e => setEnabled(e.valueOf())} />
      </Form.Item>

      <Form.Item
        label={'Subject'}
        name={['form', 'respondentNotifications', 'subject']}
        rules={[
          {
            required: enabled,
            message: 'Please provide a Subject',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={'HTML Template'}
        name={['form', 'respondentNotifications', 'htmlTemplate']}
        rules={[
          {
            required: enabled,
            message: 'Please provide a Template',
          },
        ]}
      >
        <Input.TextArea autoSize />
      </Form.Item>

      <Form.Item
        label={'Email Field'}
        name={['form', 'respondentNotifications', 'toField']}
        extra={'Field with Email for receipt'}
        rules={[
          {
            required: enabled,
            message: 'Please provide a Email Field',
          },
        ]}
      >
        <Select>
          {Object.keys(groups).map(key => (
            <Select.OptGroup label={key.toUpperCase()} key={key}>
              {groups[key].map(field => (
                <Select.Option value={field.id} key={field.id}>{field.title}</Select.Option>
              ))}
            </Select.OptGroup>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={'Sender Email'}
        name={['form', 'respondentNotifications', 'fromEmail']}
        extra={'Make sure your mailserver can send from this email'}
      >
        <Input />
      </Form.Item>
    </Tabs.TabPane>
  )
}
