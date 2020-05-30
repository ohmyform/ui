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

export const StyledButton: React.FC<Props> = ({background, highlight, color, children, ...props}) => {
  const StyledButton = styled(Button)`
    background: ${background};
    color: ${color};
    border-color: ${darken(background, 10)};
    
    :hover {
      color: ${highlight};
      background-color: ${lighten(background, 10)};
      border-color: ${darken(highlight, 10)};
    }
  `

  return (
    <StyledButton {...props}>{children}</StyledButton>
  )
}
