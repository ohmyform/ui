import { Form, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRouter } from 'next/router'
import React from 'react'
import { FormDesignFragment, FormFieldFragment } from '../../graphql/fragment/form.fragment'
import { StyledButton } from '../styled/button'
import { StyledH1 } from '../styled/h1'
import { StyledMarkdown } from '../styled/markdown'
import { fieldTypes } from './types'
import { TextType } from './types/text.type'
import { FieldTypeProps } from './types/type.props'

interface Props {
  field: FormFieldFragment
  design: FormDesignFragment

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save: (data: any) => void
  next: () => void
  prev: () => void
}

export const Field: React.FC<Props> = ({ field, save, design, next, prev, ...props }) => {
  const [form] = useForm()
  const router = useRouter()

  const FieldInput: React.FC<FieldTypeProps> = fieldTypes[field.type] || TextType

  const finish = (data) => {
    console.log('received field data', data)
    save(data)
    next()
  }

  const error = async () => {
    await message.error('Check inputs!')
  }

  const getUrlDefault = (): string => {
    if (router.query[field.id]) {
      return router.query[field.id] as string
    }

    if (router.query[field.slug]) {
      return router.query[field.slug] as string
    }

    return undefined
  }

  return (
    <Form
      form={form}
      onFinish={finish}
      onFinishFailed={error}
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 32,
          justifyContent: 'flex-end',
        }}
      >
        <StyledH1 design={design} type={'question'}>
          {field.title}
        </StyledH1>
        {field.description && (
          <StyledMarkdown design={design} type={'question'} source={field.description} />
        )}

        <FieldInput design={design} field={field} urlValue={getUrlDefault()} />
      </div>
      <div
        style={{
          padding: 32,
          display: 'flex',
        }}
      >
        <StyledButton
          background={design.colors.buttonColor}
          color={design.colors.buttonTextColor}
          highlight={design.colors.buttonActiveColor}
          onClick={prev}
        >
          {'Previous'}
        </StyledButton>

        <div style={{ flex: 1 }} />

        <StyledButton
          background={design.colors.buttonColor}
          color={design.colors.buttonTextColor}
          highlight={design.colors.buttonActiveColor}
          size={'large'}
          onClick={form.submit}
        >
          {'Next'}
        </StyledButton>
      </div>
    </Form>
  )
}
