import { ApolloProvider } from '@apollo/client'
import 'antd/dist/antd.css'
import 'assets/global.scss'
import 'assets/variables.scss'
import 'i18n'
import { AppInitialProps } from 'next/app'
import getConfig from 'next/config'
import { AppType } from 'next/dist/next-server/lib/utils'
import Head from 'next/head'
import React from 'react'
import { wrapper } from 'store'
import getClient from '../graphql/client'

const { publicRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: {
    endpoint: string
  }
}

const App: AppType = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={getClient()}>
      <Head>
        <title>OhMyForm</title>
        <meta name="theme-color" content={'#4182e4'} />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

App.getInitialProps = (): AppInitialProps => ({
  pageProps: {},
})

export default wrapper.withRedux(App)
