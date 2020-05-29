import {Form, Input, Select, Switch, Tabs} from 'antd'
import {FormInstance} from 'antd/lib/form'
import {TabPaneProps} from 'antd/lib/tabs'
import React, {useEffect, useState} from 'react'
import {AdminFormFieldFragment} from '../../../graphql/fragment/admin.form.fragment'

interface Props extends TabPaneProps {
  form: FormInstance
  fields: AdminFormFieldFragment[]
}

export const SelfNotificationsTab: React.FC<Props> = props => {
  const [enabled, setEnabled] = useState<boolean>()

  useEffect(() => {
    const next = props.form.getFieldValue(['form', 'selfNotifications', 'enabled'])

    if (next !== enabled) {
      setEnabled(next)
    }
  }, [props.form.getFieldValue(['form', 'selfNotifications', 'enabled'])])

  useEffect(() => {
    props.form.validateFields([
      ['form', 'selfNotifications', 'subject'],
      ['form', 'selfNotifications', 'htmlTemplate'],
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
        name={['form', 'selfNotifications', 'enabled']}
        valuePropName={'checked'}
      >
        <Switch onChange={e => setEnabled(e.valueOf())} />
      </Form.Item>

      <Form.Item
        label={'Subject'}
        name={['form', 'selfNotifications', 'subject']}
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
        name={['form', 'selfNotifications', 'htmlTemplate']}
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
        name={['form', 'selfNotifications', 'fromField']}
        extra={'Field with Email, will set the Reply-To header'}
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
        label={'Your Email'}
        name={['form', 'selfNotifications', 'toEmail']}
        extra={'If not set will send to the admin of the form'}
      >
        <Input />
      </Form.Item>
    </Tabs.TabPane>
  )
}
