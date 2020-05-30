import {InputNumber} from 'antd'
import {InputNumberProps} from 'antd/lib/input-number'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {FormDesignFragment} from '../../graphql/fragment/form.fragment'
import {transparentize} from './color.change'

interface Props extends InputNumberProps {
  design: FormDesignFragment
}

export const StyledNumberInput: React.FC<Props> = ({design, children, ...props}) => {
  const [Field, setField] = useState()

  useEffect(() => {
    setField(
      styled(InputNumber)`
        color: ${design.colors.answerColor};
        border-color: ${design.colors.answerColor};
        background: none !important;
        border-right: none;
        border-top: none;
        border-left: none;
        border-radius: 0;
        width: 100%;
        
        :focus {
          outline: ${design.colors.answerColor} auto 5px
        }
        
        :hover,
        :active {
          border-color: ${design.colors.answerColor};
        }
        
        &.ant-input-number {
          box-shadow: none
        }
        
        input {
          background: none !important;
          color: ${design.colors.answerColor};
          
          ::placeholder {
            color: ${transparentize(design.colors.answerColor, 60)}
          }
        }
        
        .anticon {
          color: ${design.colors.answerColor};
        }
      `
    )
  }, [design])

  if (!Field) {
    return null
  }

  return (
    <Field {...props}>{children}</Field>
  )
}
