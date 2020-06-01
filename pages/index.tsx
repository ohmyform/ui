import {Layout} from 'antd'
import {AuthFooter} from 'components/auth/footer'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {LoadingPage} from '../components/loading.page'

const Index: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.pathname !== window.location.pathname) {
      let href = router.asPath
      let as = router.asPath;

      [
        /(\/form\/)[^\/]+/i,
        /(\/admin\/forms\/)[^\/]+/i,
        /(\/admin\/users\/)[^\/]+/i,
      ].forEach(r => {
        if (r.test(as)) {
          href = href.replace(r, '$1[id]')
        }
      })

      router.replace(href, as)
    }
  })

  if (process.browser && router.pathname !== window.location.pathname) {
    return (
      <LoadingPage message={'redirecting'} />
    )
  }

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
