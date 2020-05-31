import React from 'react'
import styled from 'styled-components'
import {FormDesignFragment} from '../../graphql/fragment/form.fragment'

interface Props {
  type: 'question' | 'answer'
  design: FormDesignFragment
}

const Paragraph = styled.p`
  color: ${props => props.type === 'question' ? props.design.colors.questionColor : props.design.colors.answerColor}
`

export const StyledP: React.FC<Props> = ({children, ...props}) => {
  return (
    <Paragraph {...props}>{children}</Paragraph>
  )
}
