import {useMutation} from '@apollo/react-hooks'
import {Button, Form, Input, message, Tabs} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {cleanInput} from 'components/clean.input'
import {BaseDataTab} from 'components/form/admin/base.data.tab'
import Structure from 'components/structure'
import {withAuth} from 'components/with.auth'
import {AdminFormQueryData} from 'graphql/query/admin.form.query'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {
  ADMIN_FORM_CREATE_MUTATION,
  AdminFormCreateMutationData,
  AdminFormCreateMutationVariables
} from '../../../graphql/mutation/admin.form.create.mutation'

const Create: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [form] = useForm()
  const [saving, setSaving] = useState(false)
  const [create] = useMutation<AdminFormCreateMutationData, AdminFormCreateMutationVariables>(ADMIN_FORM_CREATE_MUTATION)

  const save = async (formData: AdminFormQueryData) => {
    setSaving(true)
    console.log('try to save form!', formData)

    try {
      const next = (await create({
        variables: cleanInput(formData),
      })).data

      message.success('Form Created')

      router.replace('/admin/forms/[id]', `/admin/forms/${next.form.id}`)
    } catch (e) {
      console.error('failed to save', e)
      message.error('Could not save Form')
    }

    setSaving(false)
  }

  return (
    <Structure
      loading={saving}
      title={'Create New Form'}
      selected={'forms'}
      breadcrumbs={[
        { href: '/admin', name: t('admin:home') },
        { href: '/admin/forms', name: t('admin:forms') },
      ]}
      extra={[
        <Button
          key={'create'}
          onClick={form.submit}
          type={'primary'}
        >
          Save
        </Button>,
      ]}
      style={{paddingTop: 0}}
    >
      <Form
        form={form}
        onFinish={save}
        onFinishFailed={errors => {
          message.error('Required fields are missing')
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
        <Form.Item noStyle name={['form', 'id']}><Input type={'hidden'} /></Form.Item>

        <Tabs>
          {/*
          <FieldsTab
            key={'fields'}
            tab={'Fields'}
            fields={fields}
            onChangeFields={setFields}
            form={form}
          />
          */}
          <BaseDataTab key={'base_data'} tab={'Base Data'} />
          {/*
          <DesignTab key={'design'} tab={'Design'} />
          <SelfNotificationsTab
            key={'self_notifications'}
            tab={'Self Notifications'}
            fields={fields}
            form={form}
          />
          <RespondentNotificationsTab
            key={'respondent_notifications'}
            tab={'Respondent Notifications'}
            fields={fields}
            form={form}
          />
          <StartPageTab key={'start_page'} tab={'Start Page'} />
          <EndPageTab key={'end_page'} tab={'End Page'} />
          */}
        </Tabs>
      </Form>
    </Structure>
  )
}

export default withAuth(Create, ['admin'])
