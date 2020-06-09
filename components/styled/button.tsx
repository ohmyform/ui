import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from './color.change'

interface Props extends ButtonProps {
  background: string
  highlight: string
  color: string
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const Styled = styled(Button)`
  background: ${(props: Props) => props.background};
  color: ${(props: Props) => props.color};
  border-color: ${(props: Props) => darken(props.background, 10)};

  :hover {
    color: ${(props: Props) => props.highlight};
    background-color: ${(props: Props) => lighten(props.background, 10)};
    border-color: ${(props: Props) => darken(props.highlight, 10)};
  }
`

export const StyledButton: React.FC<Props> = ({ children, ...props }) => {
  return <Styled {...props}>{children}</Styled>
}
