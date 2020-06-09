import { Input } from 'antd'
import { InputProps } from 'antd/lib/input/Input'
import React from 'react'
import styled from 'styled-components'
import { FormDesignFragment } from '../../graphql/fragment/form.fragment'
import { transparentize } from './color.change'

interface Props extends InputProps {
  design: FormDesignFragment
}

const Field = styled(Input)`
  color: ${(props) => props.design.colors.answerColor};
  border-color: ${(props) => props.design.colors.answerColor};
  background: none !important;
  border-right: none;
  border-top: none;
  border-left: none;
  border-radius: 0;

  :focus {
    outline: ${(props) => props.design.colors.answerColor} auto 5px;
  }

  :hover,
  :active {
    border-color: ${(props) => props.design.colors.answerColor};
  }

  &.ant-input-affix-wrapper {
    box-shadow: none;
  }

  input {
    background: none !important;
    color: ${(props) => props.design.colors.answerColor};

    ::placeholder {
      color: ${(props) => transparentize(props.design.colors.answerColor, 60)};
    }
  }

  .anticon {
    color: ${(props) => props.design.colors.answerColor};
  }
`

export const StyledInput: React.FC<Props> = ({ children, ...props }) => {
  return <Field {...props}>{children}</Field>
}
