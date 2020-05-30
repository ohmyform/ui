import {DatePicker} from 'antd'
import {PickerProps} from 'antd/lib/date-picker/generatePicker'
import {Moment} from 'moment'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {FormDesignFragment} from '../../graphql/fragment/form.fragment'
import {transparentize} from './color.change'

type Props = { design: FormDesignFragment } & PickerProps<Moment>

export const StyledDateInput: React.FC<Props> = ({design, children, ...props}) => {
  const [Field, setField] = useState()

  useEffect(() => {
    setField(
      styled(DatePicker)`
        color: ${design.colors.answerColor};
        border-color: ${design.colors.answerColor};
        background: none !important;
        border-right: none;
        border-top: none;
        border-left: none;
        border-radius: 0;
        width: 100%;
        
        :hover,
        :active {
          border-color: ${design.colors.answerColor};
        }
        
        &.ant-picker {
          box-shadow: none
        }
        
        .ant-picker-clear {
          background: none;
        }
        
        input {
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
