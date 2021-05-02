import { Space } from 'antd'
import React from 'react'
import {
  FormPublicDesignFragment,
  FormPublicPageFragment,
} from '../../graphql/fragment/form.public.fragment'
import { StyledButton } from '../styled/button'
import { StyledH1 } from '../styled/h1'
import { StyledMarkdown } from '../styled/markdown'
import scss from './page.module.scss'

interface Props {
  type: 'start' | 'end'
  page: FormPublicPageFragment
  design: FormPublicDesignFragment
  className?: string

  next: () => void
  prev: () => void
}

export const FormPage: React.FC<Props> = ({ page, design, next, prev, className, ...props }) => {
  if (!page.show) {
    return null
  }

  return (
    <div className={[scss.main, className].filter((c) => !!c).join(' ')} {...props}>
      <div className={scss.content}>
        <StyledH1 design={design} type={'question'}>
          {page.title}
        </StyledH1>
        <StyledMarkdown design={design} type={'question'} source={page.paragraph} />
      </div>
      <div
        style={{
          padding: 32,
          display: 'flex',
        }}
      >
        {prev && <div />}
        {page.buttons.length > 0 && (
          <Space>
            {page.buttons.map((button, key) => {
              return (
                <StyledButton
                  background={button.bgColor}
                  color={button.color}
                  highlight={button.activeColor}
                  key={key}
                  href={button.url}
                  target={'_blank'}
                  rel={'noreferrer'}
                >
                  {button.text}
                </StyledButton>
              )
            })}
          </Space>
        )}

        <div style={{ flex: 1 }} />

        <StyledButton
          background={design.colors.button}
          color={design.colors.buttonText}
          highlight={design.colors.buttonActive}
          size={'large'}
          onClick={next}
        >
          {page.buttonText || 'Continue'}
        </StyledButton>
      </div>
    </div>
  )
}
