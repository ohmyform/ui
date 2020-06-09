import { useMutation } from '@apollo/react-hooks'
import { Button, Form, Input, message, Tabs } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { cleanInput } from 'components/clean.input'
import { BaseDataTab } from 'components/form/admin/base.data.tab'
import Structure from 'components/structure'
import { withAuth } from 'components/with.auth'
import { AdminFormQueryData } from 'graphql/query/admin.form.query'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ADMIN_FORM_CREATE_MUTATION,
  AdminFormCreateMutationData,
  AdminFormCreateMutationVariables,
} from '../../../graphql/mutation/admin.form.create.mutation'

const Create: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [form] = useForm()
  const [saving, setSaving] = useState(false)
  const [create] = useMutation<AdminFormCreateMutationData, AdminFormCreateMutationVariables>(
    ADMIN_FORM_CREATE_MUTATION
  )

  const save = async (formData: AdminFormQueryData) => {
    setSaving(true)

    try {
      const next = (
        await create({
          variables: cleanInput(formData),
        })
      ).data

      message.success(t('form:created'))

      router.replace('/admin/forms/[id]', `/admin/forms/${next.form.id}`)
    } catch (e) {
      console.error('failed to save', e)
      message.error(t('form:creationError'))
    }

    setSaving(false)
  }

  return (
    <Structure
      loading={saving}
      title={t('form:create')}
      selected={'forms'}
      breadcrumbs={[
        { href: '/admin', name: t('admin:home') },
        { href: '/admin/forms', name: t('admin:forms') },
      ]}
      extra={[
        <Button key={'create'} onClick={form.submit} type={'primary'}>
          {t('form:createNow')}
        </Button>,
      ]}
      style={{ paddingTop: 0 }}
    >
      <Form
        form={form}
        onFinish={save}
        onFinishFailed={() => {
          // TODO process errors
          message.error(t('validation:mandatoryFieldsMissing'))
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
          <BaseDataTab key={'base_data'} tab={t('form:baseDataTab')} />
        </Tabs>
      </Form>
    </Structure>
  )
}

export default withAuth(Create, ['admin'])
