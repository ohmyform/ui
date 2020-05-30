import React from 'react'
import styled from 'styled-components'
import {FormDesignFragment} from '../../graphql/fragment/form.fragment'

interface Props {
  type: 'question' | 'answer'
  design: FormDesignFragment
}

export const StyledP: React.FC<Props> = ({design, type, children, ...props}) => {
  const Paragraph = styled.p`
    color: ${type === 'question' ? design.colors.questionColor : design.colors.answerColor}
  `

  return (
    <Paragraph {...props}>{children}</Paragraph>
  )
}
