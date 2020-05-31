import {Button} from 'antd'
import {ButtonProps} from 'antd/lib/button/button'
import React from 'react'
import styled from 'styled-components'
import {darken, lighten} from './color.change'

interface Props extends ButtonProps {
  background: any
  highlight: any
  color: any
}

const Styled = styled(Button)`
  background: ${props => props.background};
  color: ${props => props.color};
  border-color: ${props => darken(props.background, 10)};
  
  :hover {
    color: ${props => props.highlight};
    background-color: ${props => lighten(props.background, 10)};
    border-color: ${props => darken(props.highlight, 10)};
  }
`

export const StyledButton: React.FC<Props> = ({children, ...props}) => {
  return (
    <Styled {...props}>{children}</Styled>
  )
}
