import {useMutation, useQuery} from '@apollo/react-hooks'
import {Button, Form, Input, message, Select} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {cleanInput} from '../../components/clean.input'
import Structure from '../../components/structure'
import {
  ADMIN_PROFILE_UPDATE_MUTATION,
  AdminProfileUpdateMutationData,
  AdminProfileUpdateMutationVariables
} from '../../graphql/mutation/admin.profile.update.mutation'
import {
  ADMIN_PROFILE_QUERY,
  AdminProfileQueryData,
  AdminProfileQueryVariables
} from '../../graphql/query/admin.profile.query'
import {AdminUserQueryData} from '../../graphql/query/admin.user.query'
import {languages} from '../../i18n'

const Profile: NextPage = () => {
  const router = useRouter()
  const [form] = useForm()
  const [saving, setSaving] = useState(false)

  const {data, loading, error} = useQuery<AdminProfileQueryData, AdminProfileQueryVariables>(ADMIN_PROFILE_QUERY, {
    onCompleted: next => {
      form.setFieldsValue(next)
    },
  })

  const [update] = useMutation<AdminProfileUpdateMutationData, AdminProfileUpdateMutationVariables>(ADMIN_PROFILE_UPDATE_MUTATION)

  const save = async (formData: AdminUserQueryData) => {
    setSaving(true)

    try {
      const next = (await update({
        variables: cleanInput(formData),
      })).data

      form.setFieldsValue(next)

      message.success('Profile Updated')
    } catch (e) {
      console.error('failed to save', e)
      message.error('Could not save Profile')
    }

    setSaving(false)
  }


  return (
    <Structure
      loading={loading || saving}
      title={'Profile'}
      selected={'profile'}
      breadcrumbs={[
        { href: '/admin', name: 'Home' },
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

        <Form.Item
          label="Username"
          name={['user', 'username']}
          rules={[
            {
              required: true,
              message: 'Please provide a Username',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name={['user', 'email']}
          rules={[
            {
              required: true,
              message: 'Please provide an email',
            },
            {
              type: 'email',
              message: 'Must be a valid email',
            },
          ]}
        >
          <Input type={'email'} />
        </Form.Item>

        <Form.Item
          label="Language"
          name={['user', 'language']}
          rules={[
            {
              required: true,
              message: 'Please select a Language',
            },
          ]}
        >
          <Select>
            {languages.map(language => <Select.Option value={language} key={language}>{language.toUpperCase()}</Select.Option> )}
          </Select>
        </Form.Item>

        <Form.Item
          label="First Name"
          name={['user', 'firstName']}
        >
          <Input  />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name={['user', 'lastName']}
        >
          <Input  />
        </Form.Item>
      </Form>
    </Structure>
  )
}

export default Profile
