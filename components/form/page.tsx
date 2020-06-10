import { Space } from 'antd'
import React from 'react'
import { FormDesignFragment, FormPageFragment } from '../../graphql/fragment/form.fragment'
import { StyledButton } from '../styled/button'
import { StyledH1 } from '../styled/h1'
import { StyledP } from '../styled/p'

interface Props {
  type: 'start' | 'end'
  page: FormPageFragment
  design: FormDesignFragment

  next: () => void
  prev: () => void
}

export const FormPage: React.FC<Props> = ({ page, design, next, prev, ...props }) => {
  if (!page.show) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      {...props}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <StyledH1 design={design} type={'question'}>
          {page.title}
        </StyledH1>
        <StyledP design={design} type={'question'}>
          {page.paragraph}
        </StyledP>
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
          background={design.colors.buttonColor}
          color={design.colors.buttonTextColor}
          highlight={design.colors.buttonActiveColor}
          size={'large'}
          onClick={next}
        >
          {page.buttonText || 'Continue'}
        </StyledButton>
      </div>
    </div>
  )
}
