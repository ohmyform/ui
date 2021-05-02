import { DatePicker } from 'antd'
import { PickerProps } from 'antd/lib/date-picker/generatePicker'
import { Moment } from 'moment'
import React from 'react'
import styled from 'styled-components'
import { FormPublicDesignFragment } from '../../graphql/fragment/form.public.fragment'
import { transparentize } from './color.change'

type Props = { design: FormPublicDesignFragment } & PickerProps<Moment>

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Field = styled(DatePicker)`
  color: ${(props: Props) => props.design.colors.answer};
  border-color: ${(props: Props) => props.design.colors.answer};
  background: none !important;
  border-right: none;
  border-top: none;
  border-left: none;
  border-radius: 0;
  width: 100%;

  :hover,
  :active {
    border-color: ${(props: Props) => props.design.colors.answer};
  }

  &.ant-picker {
    box-shadow: none;
  }

  .ant-picker-clear {
    background: none;
  }

  input {
    color: ${(props: Props) => props.design.colors.answer};

    ::placeholder {
      color: ${(props: Props) => transparentize(props.design.colors.answer, 60)};
    }
  }

  .anticon {
    color: ${(props: Props) => props.design.colors.answer};
  }
`

export const StyledDateInput: React.FC<Props> = ({ children, ...props }) => {
  return <Field {...props}>{children}</Field>
}
