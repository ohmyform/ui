import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Form, Input, message, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cleanInput } from '../../components/clean.input'
import Structure from '../../components/structure'
import {
  ADMIN_PROFILE_UPDATE_MUTATION,
  AdminProfileUpdateMutationData,
  AdminProfileUpdateMutationVariables,
} from '../../graphql/mutation/admin.profile.update.mutation'
import {
  ADMIN_PROFILE_QUERY,
  AdminProfileQueryData,
  AdminProfileQueryVariables,
} from '../../graphql/query/admin.profile.query'
import { AdminUserQueryData } from '../../graphql/query/admin.user.query'
import { languages } from '../../i18n'

const Profile: NextPage = () => {
  const { t } = useTranslation()
  const [form] = useForm()
  const [saving, setSaving] = useState(false)

  const { loading } = useQuery<AdminProfileQueryData, AdminProfileQueryVariables>(
    ADMIN_PROFILE_QUERY,
    {
      onCompleted: (next) => {
        form.setFieldsValue(next)
      },
    }
  )

  const [update] = useMutation<AdminProfileUpdateMutationData, AdminProfileUpdateMutationVariables>(
    ADMIN_PROFILE_UPDATE_MUTATION
  )

  const save = async (formData: AdminUserQueryData) => {
    setSaving(true)

    try {
      const next = (
        await update({
          variables: cleanInput(formData),
        })
      ).data

      form.setFieldsValue(next)

      await message.success(t('profile:updated'))
    } catch (e) {
      console.error('failed to save', e)
      await message.error(t('profile:updateError'))
    }

    setSaving(false)
  }

  return (
    <Structure
      loading={loading || saving}
      title={t('admin:profile')}
      selected={'profile'}
      breadcrumbs={[{ href: '/admin', name: t('admin:home') }]}
      extra={[
        <Button key={'save'} onClick={form.submit} type={'primary'}>
          {t('profile:updateNow')}
        </Button>,
      ]}
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
        <Form.Item noStyle name={['user', 'id']}>
          <Input type={'hidden'} />
        </Form.Item>

        <Form.Item
          label={t('profile:username')}
          name={['user', 'username']}
          rules={[
            {
              required: true,
              message: t('validation:usernameRequired'),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('profile:email')}
          name={['user', 'email']}
          rules={[
            {
              required: true,
              message: t('validation:emailRequired'),
            },
            {
              type: 'email',
              message: t('validation:invalidEmail'),
            },
          ]}
        >
          <Input type={'email'} />
        </Form.Item>

        <Form.Item
          label={t('profile:language')}
          name={['user', 'language']}
          rules={[
            {
              required: true,
              message: t('validation:languageRequired'),
            },
          ]}
        >
          <Select>
            {languages.map((language) => (
              <Select.Option value={language} key={language}>
                {t(`language:${language}`)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={t('profile:firstName')} name={['user', 'firstName']}>
          <Input />
        </Form.Item>

        <Form.Item label={t('profile:lastName')} name={['user', 'lastName']}>
          <Input />
        </Form.Item>
      </Form>
    </Structure>
  )
}

export default Profile
