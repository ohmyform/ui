import { ApolloProvider } from '@apollo/client'
import 'antd/dist/antd.css'
import 'assets/global.scss'
import 'assets/variables.scss'
import debug from 'debug'
import 'i18n'
import getConfig from 'next/config'
import { AppInitialProps, AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { wrapper } from 'store'
import getClient from '../graphql/client'
import { NextConfigType } from '../next.config.type'

const { publicRuntimeConfig } = getConfig() as NextConfigType

const App: AppType = ({ Component, pageProps }) => {

  useEffect(() => {
    if (publicRuntimeConfig.environment !== 'production') {
      debug.enable('*,-micromark')
    }
  })

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
