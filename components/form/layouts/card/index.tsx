import { Card, Form, message, Modal, Spin } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Omf } from '../../../omf'
import { StyledButton } from '../../../styled/button'
import { darken, lighten } from '../../../styled/color.change'
import { LayoutProps } from '../layout.props'
import { Field } from './field'
import { Page } from './page'

type Step = 'start' | 'form' | 'end'

const MyCard = styled.div<{ background: string }>`
  background: ${(props) => darken(props.background, 10)};
  height: 100%;
  min-height: 100vh;

  padding: 32px;

  .ant-card {
    background: ${(props) => props.background};
    border-color: ${(props) => lighten(props.background, 40)};
    width: 800px;
    margin: auto;
    max-width: 90%;
  }
`

export const CardLayout: React.FC<LayoutProps> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<Step>(props.form.startPage.show ? 'start' : 'form')

  const { design, startPage, endPage, fields } = props.form
  const { setField } = props.submission

  const finish = async (data: { [key: number]: unknown }) => {
    console.log('data', data)
    setLoading(true)

    try {
      // save fields
      await Promise.all(Object.keys(data).map((fieldId) => setField(fieldId, data[fieldId])))

      await props.submission.finish()

      if (endPage.show) {
        setStep('end')
      } else {
        Modal.success({
          content: t('form:submitted'),
          okText: t('from:restart'),
          onOk: () => {
            window.location.reload()
          },
        })
      }
    } catch (e) {
      console.error(e)
      void message.error({
        content: 'Error saving Input',
      })
    }

    setLoading(false)
  }

  const render = () => {
    switch (step) {
      case 'start':
        return <Page page={startPage} design={design} next={() => setStep('form')} />

      case 'form':
        return (
          <Card>
            <Form form={form} onFinish={finish}>
              {fields.map((field, i) => {
                if (field.type === 'hidden') {
                  return null
                }

                return <Field key={field.id} field={field} design={design} />
              })}
              <div
                style={{
                  padding: 32,
                  display: 'flex',
                }}
              >
                {startPage.show && (
                  <StyledButton
                    background={design.colors.button}
                    color={design.colors.buttonText}
                    highlight={design.colors.buttonActive}
                    onClick={() => setStep('start')}
                  >
                    {t('form:previous')}
                  </StyledButton>
                )}

                <div style={{ flex: 1 }} />

                <StyledButton
                  background={design.colors.button}
                  color={design.colors.buttonText}
                  highlight={design.colors.buttonActive}
                  size={'large'}
                  onClick={form.submit}
                >
                  {t('form:next')}
                </StyledButton>
              </div>
            </Form>
          </Card>
        )

      case 'end':
        return (
          <Page
            page={endPage}
            design={design}
            next={() => {
              window.location.reload()
            }}
          />
        )
    }
  }

  return (
    <MyCard background={design.colors.background}>
      <Omf />

      <Spin spinning={loading}>{render()}</Spin>
    </MyCard>
  )
}
