import React from 'react'
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'
import styled from 'styled-components'
import { FormDesignFragment } from '../../graphql/fragment/form.fragment'
import { lighten } from './color.change'

interface Props extends ReactMarkdownProps {
  type: 'question' | 'answer'
  design: FormDesignFragment
}

const getColor = (props: Props) =>
  props.type === 'question' ? props.design.colors.questionColor : props.design.colors.answerColor

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
const Markdown = styled(ReactMarkdown)`
  color: ${getColor};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  div {
    color: ${getColor};
  }

  blockquote {
    color: ${(props: Props) => lighten(getColor(props), 50)};
    padding-left: 20px;
    border-left: 10px rgba(0, 0, 0, 0.05) solid;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;

    tr {
      border-top: 1px solid ${getColor};

      th,
      td {
        padding: 6px 13px;
        border: 1px solid ${getColor};
      }
    }

    tr:nth-child(2n) {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`

export const StyledMarkdown: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Markdown escapeHtml={false} {...props}>
      {children}
    </Markdown>
  )
}
