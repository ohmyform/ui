import React from 'react'
import styled from 'styled-components'
import { FormDesignFragment } from '../../graphql/fragment/form.fragment'

interface Props {
  type: 'question' | 'answer'
  design: FormDesignFragment
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
const Paragraph = styled.p`
  color: ${(props: Props) =>
    props.type === 'question'
      ? props.design.colors.questionColor
      : props.design.colors.answerColor};
`

export const StyledP: React.FC<Props> = ({ children, ...props }) => {
  return <Paragraph {...props}>{children}</Paragraph>
}
