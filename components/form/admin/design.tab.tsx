import {Form, Input, Tabs} from 'antd'
import {TabPaneProps} from 'antd/lib/tabs'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {InputColor} from '../../input/color'

export const DesignTab: React.FC<TabPaneProps> = props => {
  const { t } = useTranslation()

  return (
    <Tabs.TabPane {...props}>
      <Form.Item
        label={t('form:design.font')}
        name={['form', 'design', 'font']}
      >
        <Input />
      </Form.Item>

      {[
        'backgroundColor',
        'questionColor',
        'answerColor',
        'buttonColor',
        'buttonActiveColor',
        'buttonTextColor',
      ].map(name => (
        <Form.Item key={name} label={t(`form:design.${name}`)} name={['form', 'design', 'colors', name]}>
          <InputColor />
        </Form.Item>
      ))}
    </Tabs.TabPane>
  )
}
