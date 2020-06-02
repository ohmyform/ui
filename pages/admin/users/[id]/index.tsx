import {useMutation, useQuery} from '@apollo/react-hooks'
import {Button, Form, Input, message, Tabs} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import Structure from 'components/structure'
import {withAuth} from 'components/with.auth'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {cleanInput} from '../../../../components/clean.input'
import {BaseDataTab} from '../../../../components/user/admin/base.data.tab'
import {
  ADMIN_USER_UPDATE_MUTATION,
  AdminUserUpdateMutationData,
  AdminUserUpdateMutationVariables
} from '../../../../graphql/mutation/admin.user.update.mutation'
import {ADMIN_USER_QUERY, AdminUserQueryData, AdminUserQueryVariables} from '../../../../graphql/query/admin.user.query'

const Index: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [form] = useForm()
  const [saving, setSaving] = useState(false)

  const {data, loading, error} = useQuery<AdminUserQueryData, AdminUserQueryVariables>(ADMIN_USER_QUERY, {
    variables: {
      id: router.query.id as string
    },
    onCompleted: next => {
      form.setFieldsValue(next)
    },
  })

  const [update] = useMutation<AdminUserUpdateMutationData, AdminUserUpdateMutationVariables>(ADMIN_USER_UPDATE_MUTATION)

  const save = async (formData: AdminUserQueryData) => {
    setSaving(true)
    try {
      const next = (await update({
        variables: cleanInput(formData),
      })).data

      form.setFieldsValue(next)

      message.success('User Updated')
    } catch (e) {
      console.error('failed to save', e)
      message.error('Could not save User')
    }

    setSaving(false)
  }

  return (
    <Structure
      loading={loading || saving}
      title={loading ? 'Loading User' : `Edit User "${data.user.email}"`}
      selected={'users'}
      breadcrumbs={[
        { href: '/admin', name: t('admin:home') },
        { href: '/admin/users', name: t('admin:users') },
      ]}
      extra={[
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
        <Form.Item noStyle name={['user', 'id']}><Input type={'hidden'} /></Form.Item>

        <Tabs>
          <BaseDataTab
            key={'base_data'}
            tab={'Base Data'}
          />
        </Tabs>
      </Form>
    </Structure>
  )
}

export default withAuth(Index, ['admin'])
