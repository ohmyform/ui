import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Form, Input, message, Tabs } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { cleanInput } from 'components/clean.input'
import { BaseDataTab } from 'components/form/admin/base.data.tab'
import { DesignTab } from 'components/form/admin/design.tab'
import { EndPageTab } from 'components/form/admin/end.page.tab'
import { FieldsTab } from 'components/form/admin/fields.tab'
import { RespondentNotificationsTab } from 'components/form/admin/respondent.notifications.tab'
import { SelfNotificationsTab } from 'components/form/admin/self.notifications.tab'
import { StartPageTab } from 'components/form/admin/start.page.tab'
import Structure from 'components/structure'
import { withAuth } from 'components/with.auth'
import {
  AdminFormFieldFragment,
  AdminFormFieldOptionKeysFragment,
} from 'graphql/fragment/admin.form.fragment'
import {
  ADMIN_FORM_UPDATE_MUTATION,
  AdminFormUpdateMutationData,
  AdminFormUpdateMutationVariables,
} from 'graphql/mutation/admin.form.update.mutation'
import {
  ADMIN_FORM_QUERY,
  AdminFormQueryData,
  AdminFormQueryVariables,
} from 'graphql/query/admin.form.query'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Index: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [form] = useForm()
  const [saving, setSaving] = useState(false)
  const [fields, setFields] = useState<AdminFormFieldFragment[]>([])
  const [update] = useMutation<AdminFormUpdateMutationData, AdminFormUpdateMutationVariables>(
    ADMIN_FORM_UPDATE_MUTATION
  )

  const processNext = (next: AdminFormQueryData): AdminFormQueryData => {
    next.form.fields = next.form.fields.map((field) => {
      const keys: AdminFormFieldOptionKeysFragment = {}

      field.options.forEach((option) => {
        if (option.key) {
          keys[option.key] = option.value
        }
      })

      field.options = field.options.filter((option) => !option.key)
      field.optionKeys = keys
      return field
    })

    return next
  }

  const { data, loading } = useQuery<AdminFormQueryData, AdminFormQueryVariables>(
    ADMIN_FORM_QUERY,
    {
      variables: {
        id: router.query.id as string,
      },
      onCompleted: (next) => {
        next = processNext(next)
        form.setFieldsValue(next)
        setFields(next.form.fields)
      },
    }
  )

  const save = async (formData: AdminFormQueryData) => {
    setSaving(true)

    formData.form.fields = formData.form.fields
      .filter((e) => e && e.type)
      .map(({ optionKeys, ...field }) => {
        const options = field.options

        if (optionKeys) {
          Object.keys(optionKeys).forEach((key) => {
            if (!optionKeys[key]) {
              return
            }

            options.push({
              value: optionKeys[key],
              key,
            })
          })
        }

        return {
          ...field,
          options,
        }
      })

    try {
      const next = processNext(
        (
          await update({
            variables: cleanInput(formData),
          })
        ).data
      )

      form.setFieldsValue(next)
      setFields(next.form.fields)

      await message.success(t('form:updated'))
    } catch (e) {
      console.error('failed to save', e)
      await message.error(t('form:updateError'))
    }

    setSaving(false)
  }

  return (
    <Structure
      loading={loading || saving}
      title={loading ? t('form:loading') : t('form:mange', { title: data.form.title })}
      selected={'forms'}
      breadcrumbs={[
        { href: '/admin', name: t('admin:home') },
        { href: '/admin/forms', name: t('admin:forms') },
      ]}
      extra={[
        <Link
          key={'submissions'}
          href={'/admin/forms/[id]/submissions'}
          as={`/admin/forms/${router.query.id as string}/submissions`}
        >
          <Button>{t('admin:submissions')}</Button>
        </Link>,
        <Button key={'save'} onClick={form.submit} type={'primary'}>
          {t('form:updateNow')}
        </Button>,
      ]}
      style={{ paddingTop: 0 }}
    >
      <Form
        form={form}
        onFinish={save}
        onFinishFailed={async () => {
          // TODO process errors
          await message.error(t('validation:mandatoryFieldsMissing'))
        }}
        labelCol={{
          xs: { span: 24 },
          sm: { span: 6 },
        }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 18 },
        }}
      >
        <Form.Item noStyle name={['form', 'id']}>
          <Input type={'hidden'} />
        </Form.Item>

        <Tabs>
          <FieldsTab
            key={'fields'}
            tab={t('form:fieldsTab')}
            fields={fields}
            onChangeFields={setFields}
            form={form}
          />
          <BaseDataTab key={'base_data'} tab={t('form:baseDataTab')} />
          <DesignTab key={'design'} tab={t('form:designTab')} />
          <SelfNotificationsTab
            key={'self_notifications'}
            tab={t('form:selfNotificationsTab')}
            fields={fields}
            form={form}
          />
          <RespondentNotificationsTab
            key={'respondent_notifications'}
            tab={t('form:respondentNotificationsTab')}
            fields={fields}
            form={form}
          />
          <StartPageTab key={'start_page'} tab={t('form:startPageTab')} />
          <EndPageTab key={'end_page'} tab={t('form:endPageTab')} />
        </Tabs>
      </Form>
    </Structure>
  )
}

export default withAuth(Index, ['admin'])
