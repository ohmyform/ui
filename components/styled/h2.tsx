import React from 'react'
import styled from 'styled-components'
import {FormDesignFragment} from '../../graphql/fragment/form.fragment'

interface Props {
  type: 'question' | 'answer'
  design: FormDesignFragment
}

export const StyledH2: React.FC<Props> = ({design, type, children, ...props}) => {
  const Header = styled.h2`
    color: ${type === 'question' ? design.colors.questionColor : design.colors.answerColor}
  `

  return (
    <Header {...props}>{children}</Header>
  )
}
