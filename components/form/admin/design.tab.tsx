import {Form, Input, Tabs} from 'antd'
import {TabPaneProps} from 'antd/lib/tabs'
import React from 'react'
import {InputColor} from '../../input/color'

export const DesignTab: React.FC<TabPaneProps> = props => {
  return (
    <Tabs.TabPane {...props}>
      <Form.Item
        label="Font"
        name={['form', 'design', 'font']}
      >
        <Input />
      </Form.Item>

      {[
        {name: 'backgroundColor', label: 'Background Color'},
        {name: 'questionColor', label: 'Question Color'},
        {name: 'answerColor', label: 'Answer Color'},
        {name: 'buttonColor', label: 'Button Color'},
        {name: 'buttonTextColor', label: 'Button Text Color'},
      ].map(({label, name}) => (
        <Form.Item key={name} label={label} name={['form', 'design', 'colors', name]}>
          <InputColor />
        </Form.Item>
      ))}
    </Tabs.TabPane>
  )
}
