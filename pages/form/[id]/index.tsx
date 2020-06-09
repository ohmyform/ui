import { useQuery } from '@apollo/react-hooks'
import { Modal } from 'antd'
import { ErrorPage } from 'components/error.page'
import { Field } from 'components/form/field'
import { FormPage } from 'components/form/page'
import { LoadingPage } from 'components/loading.page'
import { FORM_QUERY, FormQueryData, FormQueryVariables } from 'graphql/query/form.query'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Swiper from 'react-id-swiper'
import { ReactIdSwiperProps } from 'react-id-swiper/lib/types'
import * as OriginalSwiper from 'swiper'
import { useSubmission } from '../../../components/use.submission'

interface Props {
  id: string
}

const Index: NextPage<Props> = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const id = router.query.id as string
  const [swiper, setSwiper] = useState<OriginalSwiper.default>(null)
  const submission = useSubmission(id)

  const { loading, data, error } = useQuery<FormQueryData, FormQueryVariables>(FORM_QUERY, {
    variables: {
      id,
    },
  })

  useEffect(() => {
    // check form language to switch to!
    if (!data) {
      return
    }

    if (i18n.language !== data.form.language) {
      i18n.changeLanguage(data.form.language)
    }
  }, [data])

  if (loading) {
    return <LoadingPage message={t('form:build')} />
  }

  if (error) {
    return <ErrorPage />
  }

  const design = data.form.design

  const goNext = () => {
    if (!swiper) return

    swiper.allowSlideNext = true
    swiper.slideNext()
    swiper.allowSlideNext = false
  }
  const goPrev = () => swiper && swiper.slidePrev()

  const swiperConfig: ReactIdSwiperProps = {
    getSwiper: setSwiper,
    direction: 'vertical',
    allowSlideNext: false,
    allowSlidePrev: true,
    updateOnWindowResize: true,
  }

  return (
    <div
      style={{
        background: design.colors.backgroundColor,
      }}
    >
      <Swiper {...swiperConfig}>
        {[
          data.form.startPage.show ? (
            <FormPage
              key={'start'}
              type={'start'}
              page={data.form.startPage}
              design={design}
              next={goNext}
              prev={goPrev}
            />
          ) : undefined,
          ...data.form.fields
            .map((field, i) => {
              if (field.type === 'hidden') {
                return null
              }

              return (
                <Field
                  key={field.id}
                  field={field}
                  design={design}
                  save={(values) => {
                    submission.setField(field.id, values[field.id])

                    if (data.form.fields.length === i + 1) {
                      submission.finish()
                    }
                  }}
                  next={() => {
                    if (data.form.fields.length === i + 1) {
                      // prevent going back!
                      swiper.allowSlidePrev = true

                      if (!data.form.endPage.show) {
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
          data.form.endPage.show ? (
            <FormPage
              key={'end'}
              type={'end'}
              page={data.form.endPage}
              design={design}
              next={submission.finish}
              prev={goPrev}
            />
          ) : undefined,
        ].filter((e) => !!e)}
      </Swiper>
    </div>
  )
}

Index.getInitialProps = async ({ query }) => {
  return {
    id: query.id as string,
  }
}

export default Index
