import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input/TextArea'
import React from 'react'
import styled from 'styled-components'
import { FormDesignFragment } from '../../graphql/fragment/form.fragment'
import { transparentize } from './color.change'

interface Props extends TextAreaProps {
  design: FormDesignFragment
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Field = styled(Input.TextArea)`
  color: ${(props: Props) => props.design.colors.answerColor};
  border-color: ${(props: Props) => props.design.colors.answerColor};
  background: none !important;
  border-right: none;
  border-top: none;
  border-left: none;
  border-radius: 0;

  :focus {
    outline: none;
    box-shadow: none;
    border-color: ${(props: Props) => props.design.colors.answerColor};
  }

  :hover,
  :active {
    border-color: ${(props: Props) => props.design.colors.answerColor};
  }

  input {
    background: none !important;
    color: ${(props: Props) => props.design.colors.answerColor};

    ::placeholder {
      color: ${(props: Props) => transparentize(props.design.colors.answerColor, 60)};
    }
  }

  .anticon {
    color: ${(props: Props) => props.design.colors.answerColor};
  }
`

export const StyledTextareaInput: React.FC<Props> = ({ children, ...props }) => {
  return <Field {...props}>{children}</Field>
}
