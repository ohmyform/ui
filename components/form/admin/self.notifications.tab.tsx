import { InfoCircleOutlined } from '@ant-design/icons/lib'
import { Form, Input, Select, Switch, Tabs } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { TabPaneProps } from 'antd/lib/tabs'
import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { AdminFormFieldFragment } from '../../../graphql/fragment/admin.form.fragment'

interface Props extends TabPaneProps {
  form: FormInstance
  fields: AdminFormFieldFragment[]
}

export const SelfNotificationsTab: React.FC<Props> = (props) => {
  const { t } = useTranslation()
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
  props.fields.forEach((field) => {
    if (!groups[field.type]) {
      groups[field.type] = []
    }
    groups[field.type].push(field)
  })

  return (
    <Tabs.TabPane {...props}>
      <Form.Item
        label={t('form:selfNotifications.enabled')}
        name={['form', 'selfNotifications', 'enabled']}
        valuePropName={'checked'}
      >
        <Switch onChange={(e) => setEnabled(e.valueOf())} />
      </Form.Item>

      <Form.Item
        label={t('form:selfNotifications.subject')}
        name={['form', 'selfNotifications', 'subject']}
        rules={[
          {
            required: enabled,
            message: t('validation:subjectRequired'),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t('form:selfNotifications.htmlTemplate')}
        name={['form', 'selfNotifications', 'htmlTemplate']}
        rules={[
          {
            required: enabled,
            message: t('validation:templateRequired'),
          },
        ]}
        extra={
          <div>
            <Trans>form:selfNotifications.htmlTemplateInfo</Trans>
            <a
              href={'https://mjml.io/try-it-live'}
              target={'_blank'}
              rel={'noreferrer'}
              style={{
                marginLeft: 16,
              }}
            >
              <InfoCircleOutlined />
            </a>
          </div>
        }
      >
        <Input.TextArea autoSize />
      </Form.Item>

      <Form.Item
        label={t('form:selfNotifications.fromField')}
        name={['form', 'selfNotifications', 'fromField']}
        extra={t('form:selfNotifications.fromFieldInfo')}
      >
        <Select>
          {Object.keys(groups).map((key) => (
            <Select.OptGroup label={key.toUpperCase()} key={key}>
              {groups[key].map((field) => (
                <Select.Option value={field.id} key={field.id}>
                  {field.title}
                </Select.Option>
              ))}
            </Select.OptGroup>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={t('form:selfNotifications.toEmail')}
        name={['form', 'selfNotifications', 'toEmail']}
        extra={t('form:selfNotifications.toEmailInfo')}
      >
        <Input />
      </Form.Item>
    </Tabs.TabPane>
  )
}
