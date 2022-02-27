import { Form, Slider, Spin } from 'antd'
import debug from 'debug'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FieldTypeProps } from './type.props'

const logger = debug('field/slider')

export const SliderType: React.FC<FieldTypeProps> = ({ field, urlValue }) => {
  const [min, setMin] = useState<number>()
  const [max, setMax] = useState<number>()
  const [step, setStep] = useState<number>()
  const [loading, setLoading] = useState(true)

  const { t } = useTranslation()

  useEffect(() => {
    field.options.forEach((option) => {
      if (option.key === 'min') {
        try {
          setMin(JSON.parse(option.value))
        } catch (e) {
          logger('invalid min value %O', e)
        }
      }
      if (option.key === 'max') {
        try {
          setMax(JSON.parse(option.value))
        } catch (e) {
          logger('invalid max value %O', e)
        }
      }
      if (option.key === 'step') {
        try {
          setStep(JSON.parse(option.value))
        } catch (e) {
          logger('invalid step value %O', e)
        }
      }
    })

    setLoading(false)
  }, [field])

  let initialValue: number = undefined

  if (field.defaultValue) {
    try {
      initialValue = JSON.parse(field.defaultValue)
    } catch (e) {
      logger('invalid default value %O', e)
    }
  }

  if (urlValue) {
    initialValue = parseFloat(urlValue)
  }

  if (loading) {
    return (
      <div>
        <Spin />
      </div>
    )
  }

  return (
    <div>
      <Form.Item
        name={[field.id, 'value']}
        rules={[{ required: field.required, message: t('validation:valueRequired') }]}
        initialValue={initialValue}
      >
        <Slider
          min={min}
          max={max}
          step={step}
          tooltipVisible={true}
          dots={(max - min) / step <= 10}
        />
      </Form.Item>
    </div>
  )
}
