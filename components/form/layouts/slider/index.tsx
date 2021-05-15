import { Modal } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Swiper from 'react-id-swiper'
import { ReactIdSwiperProps } from 'react-id-swiper/lib/types'
import * as OriginalSwiper from 'swiper'
import { Omf } from '../../../omf'
import { LayoutProps } from '../layout.props'
import { Field } from './field'
import { FormPage } from './page'

export const SliderLayout: React.FC<LayoutProps> = (props) => {
  const { t } = useTranslation()
  const [swiper, setSwiper] = useState<OriginalSwiper.default>(null)

  const { design, startPage, endPage, fields } = props.form
  const { finish, setField } = props.submission

  const goNext = () => {
    if (!swiper) return

    swiper.allowSlideNext = true
    swiper.slideNext()
    swiper.allowSlideNext = false
  }
  const goPrev = () => swiper && swiper.slidePrev()

  const swiperConfig: ReactIdSwiperProps = {
    direction: 'vertical',
    allowSlideNext: false,
    allowSlidePrev: true,
    noSwiping: true,
    updateOnWindowResize: true,
  }

  return (
    <div
      style={{
        background: design.colors.background,
      }}
    >
      <Omf />
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Swiper {...swiperConfig} ref={(element) => element && setSwiper((element as any).swiper)}>
        {[
          startPage.show ? (
            <FormPage key={'start'} page={startPage} design={design} next={goNext} prev={goPrev} />
          ) : undefined,
          ...fields
            .map((field, i) => {
              if (field.type === 'hidden') {
                return null
              }

              return (
                <Field
                  key={field.id}
                  field={field}
                  design={design}
                  save={async (values: { [key: string]: unknown }) => {
                    await setField(field.id, values[field.id])

                    if (fields.length === i + 1) {
                      finish()
                    }
                  }}
                  next={() => {
                    if (fields.length === i + 1) {
                      // prevent going back!
                      swiper.allowSlidePrev = true

                      if (!endPage.show) {
                        Modal.success({
                          content: t('form:submitted'),
                          okText: t('from:restart'),
                          onOk: () => {
                            window.location.reload()
                          },
                        })
                      }
                    }

                    goNext()
                  }}
                  prev={goPrev}
                />
              )
            })
            .filter((e) => e !== null),
          endPage.show ? (
            <FormPage key={'end'} page={endPage} design={design} next={finish} prev={goPrev} />
          ) : undefined,
        ].filter((e) => !!e)}
      </Swiper>
    </div>
  )
}
