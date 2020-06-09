import { ApolloProvider } from '@apollo/react-common'
import { buildAxiosFetch } from '@lifeomic/axios-fetch'
import 'antd/dist/antd.css'
import ApolloClient from 'apollo-boost'
import 'assets/global.scss'
import 'assets/variables.scss'
import axios from 'axios'
import { authConfig } from 'components/with.auth'
import 'i18n'
import { AppProps } from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import React from 'react'
import { wrapper } from 'store'

const { publicRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: {
    endpoint: string
  }
}

const client = new ApolloClient({
  uri: publicRuntimeConfig.endpoint,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-explicit-any
  fetch: buildAxiosFetch(axios) as any,
  request: (operation): void => {
    operation.setContext(authConfig())
  },
})

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>OhMyForm</title>
        <meta name="theme-color" content={'#4182e4'} />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default wrapper.withRedux(App)
