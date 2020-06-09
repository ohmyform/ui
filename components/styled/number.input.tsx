import { InputNumber } from 'antd'
import { InputNumberProps } from 'antd/lib/input-number'
import React from 'react'
import styled from 'styled-components'
import { FormDesignFragment } from '../../graphql/fragment/form.fragment'
import { transparentize } from './color.change'

interface Props extends InputNumberProps {
  design: FormDesignFragment
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Field = styled(InputNumber)`
  color: ${(props: Props) => props.design.colors.answerColor};
  border-color: ${(props: Props) => props.design.colors.answerColor};
  background: none !important;
  border-right: none;
  border-top: none;
  border-left: none;
  border-radius: 0;
  width: 100%;

  :focus {
    outline: ${(props: Props) => props.design.colors.answerColor} auto 5px;
  }

  :hover,
  :active {
    border-color: ${(props: Props) => props.design.colors.answerColor};
  }

  &.ant-input-number {
    box-shadow: none;
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

export const StyledNumberInput: React.FC<Props> = ({ children, ...props }) => {
  return <Field {...props}>{children}</Field>
}
