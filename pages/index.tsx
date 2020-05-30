import {Layout} from 'antd'
import {AuthFooter} from 'components/auth/footer'
import {NextPage} from 'next'
import React from 'react'

const Index: NextPage = () => {
  return (
    <Layout style={{
      height: '100vh',
      background: '#437fdc'
    }}>
      <img
        style={{
          margin: 'auto',
          maxWidth: '90%',
          width: 500,
          textAlign: 'center',
        }}
        src={require('../assets/images/logo_white.png')}
      />

      <AuthFooter />
    </Layout>
  )
}

export default Index
