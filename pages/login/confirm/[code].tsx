import {Alert} from 'antd'
import {NextPage} from 'next'
import React from 'react'
import {AuthFooter} from '../../../components/auth/footer'
import {AuthLayout} from '../../../components/auth/layout'

const Index: NextPage = () => {
  return (
    <AuthLayout>
      <Alert
        style={{
          margin: 'auto',
          maxWidth: '90%',
          width: 500,
          textAlign: 'center',
        }}
        type={'warning'}
        message={'Work in Progress'}
      />

      <AuthFooter />
    </AuthLayout>
  )
}

export default Index
