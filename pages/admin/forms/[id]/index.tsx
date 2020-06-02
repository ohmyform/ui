import {useMutation, useQuery} from '@apollo/react-hooks'
import {Button, Form, Input, message, Tabs} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {cleanInput} from 'components/clean.input'
import {BaseDataTab} from 'components/form/admin/base.data.tab'
import {DesignTab} from 'components/form/admin/design.tab'
import {EndPageTab} from 'components/form/admin/end.page.tab'
import {FieldsTab} from 'components/form/admin/fields.tab'
import {RespondentNotificationsTab} from 'components/form/admin/respondent.notifications.tab'
import {SelfNotificationsTab} from 'components/form/admin/self.notifications.tab'
import {StartPageTab} from 'components/form/admin/start.page.tab'
import Structure from 'components/structure'
import {withAuth} from 'components/with.auth'
import {AdminFormFieldFragment} from 'graphql/fragment/admin.form.fragment'
import {
  ADMIN_FORM_UPDATE_MUTATION,
  AdminFormUpdateMutationData,
  AdminFormUpdateMutationVariables
} from 'graphql/mutation/admin.form.update.mutation'
import {ADMIN_FORM_QUERY, AdminFormQueryData, AdminFormQueryVariables} from 'graphql/query/admin.form.query'
import {NextPage} from 'next'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'

const Index: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [form] = useForm()
  const [saving, setSaving] = useState(false)
  const [fields, setFields] = useState<AdminFormFieldFragment[]>([])
  const [update] = useMutation<AdminFormUpdateMutationData, AdminFormUpdateMutationVariables>(ADMIN_FORM_UPDATE_MUTATION)

  const {data, loading, error} = useQuery<AdminFormQueryData, AdminFormQueryVariables>(ADMIN_FORM_QUERY, {
    variables: {
      id: router.query.id as string
    },
    onCompleted: next => {
      form.setFieldsValue(next)
      setFields(next.form.fields)
    }
  })

  const save = async (formData: AdminFormQueryData) => {
    setSaving(true)

    formData.form.fields = formData.form.fields.filter(e => e && e.type)

    try {
      const next = (await update({
        variables: cleanInput(formData),
      })).data

      form.setFieldsValue(next)
      setFields(next.form.fields)

      message.success('Form Updated')
    } catch (e) {
      console.error('failed to save', e)
      message.error('Could not save Form')
    }

    setSaving(false)
  }



  return (
    <Structure
      loading={loading || saving}
      title={loading ? 'Loading Form' : `Edit Form "${data.form.title}"`}
      selected={'forms'}
      breadcrumbs={[
        { href: '/admin', name: t('admin:home') },
        { href: '/admin/forms', name: t('admin:forms') },
      ]}
      extra={[
        <Link href={'/admin/forms/[id]/submissions'} as={`/admin/forms/${router.query.id}/submissions`}>
          <Button
            key={'submissions'}
          >
            Submissions
          </Button>
        </Link>,
        <Button
          key={'save'}
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
          <FieldsTab
            key={'fields'}
            tab={'Fields'}
            fields={fields}
            onChangeFields={setFields}
            form={form}
          />
          <BaseDataTab key={'base_data'} tab={'Base Data'} />
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
        </Tabs>
      </Form>
    </Structure>
  )
}

export default withAuth(Index, ['admin'])
