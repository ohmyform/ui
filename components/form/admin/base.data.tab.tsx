import {Form, Input, Select, Switch, Tabs} from 'antd'
import {TabPaneProps} from 'antd/lib/tabs'
import React from 'react'
import {languages} from '../../../i18n'

export const BaseDataTab: React.FC<TabPaneProps> = props => {
  return (
    <Tabs.TabPane {...props}>
      <Form.Item
        label="Is Live"
        name={['form', 'isLive']}
        valuePropName={'checked'}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="Title"
        name={['form', 'title']}
        rules={[
          {
            required: true,
            message: 'Please provide a Title',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Language"
        name={['form', 'language']}
        rules={[
          {
            required: true,
            message: 'Please select a Language',
          },
        ]}
      >
        <Select>
          {languages.map(language => <Select.Option value={language} key={language}>{language.toUpperCase()}</Select.Option> )}
        </Select>
      </Form.Item>

      <Form.Item
        label="Show Footer"
        name={['form', 'showFooter']}
        valuePropName={'checked'}
      >
        <Switch />
      </Form.Item>

    </Tabs.TabPane>
  )
}
