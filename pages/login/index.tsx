import {useMutation} from '@apollo/react-hooks'
import {Button, Form, Input, message} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {NextPage} from 'next'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {AuthFooter} from '../../components/auth/footer'
import {AuthLayout} from '../../components/auth/layout'
import {setAuth} from '../../components/with.auth'
import {LOGIN_MUTATION} from '../../graphql/mutation/login.mutation'

const Index: NextPage = () => {
  const [form] = useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [login] = useMutation(LOGIN_MUTATION)

  const finish = async (data) => {
    setLoading(true)
    try {
      const result = await login({
        variables: data,
      })

      await setAuth(
        result.data.tokens.access,
        result.data.tokens.refresh
      )

      message.success('Welcome back!')

      router.push('/admin')
    } catch (e) {
      message.error('username / password are invalid')
    }

    setLoading(false)
  }

  const failed = () => {
    message.error('mandatory fields missing')
  }

  return (
    <AuthLayout loading={loading}>
      <Form
        form={form}
        name="login"
        onFinish={finish}
        onFinishFailed={failed}
        style={{
          margin: 'auto',
          maxWidth: '95%',
          width: 400,
        }}
      >
        <img
          src={require('../../assets/images/logo_white_small.png')}
          alt={'OhMyForm'}
          style={{
            display: 'block',
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 16,
          }}
        />

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            size="large"
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            size="large"
            placeholder={'Password'}
          />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            block
          >
            Login Now
          </Button>
        </Form.Item>

        <Button.Group
          style={{
            width: '100%',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Link href={'/register'}>
            <Button
              type={'link'}
              ghost
            >
              Create Account
            </Button>
          </Link>
          <Link href={'/login/recover'}>
            <Button
              type={'link'}
              ghost
            >
              Lost password
            </Button>
          </Link>
        </Button.Group>
      </Form>

      <AuthFooter />
    </AuthLayout>
  )
}

export default Index
