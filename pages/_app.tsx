import {ApolloProvider} from '@apollo/react-common'
import {buildAxiosFetch} from '@lifeomic/axios-fetch'
import 'antd/dist/antd.css'
import ApolloClient from 'apollo-boost'
import 'assets/global.scss'
import 'assets/variables.scss'
import axios from 'axios'
import {authConfig} from 'components/with.auth'
import {AppProps} from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import React from 'react'
import {wrapper} from 'store'

const { publicRuntimeConfig } = getConfig()

const client = new ApolloClient({
  uri: publicRuntimeConfig.endpoint,
  fetch: buildAxiosFetch(axios),
  request: async (operation): Promise<void> => {
    operation.setContext(await authConfig())
  }
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

const WrappedApp = wrapper.withRedux(App)

WrappedApp.getInitialProps = async (): Promise<any> => {
  // important for now to pass public runtime config to clients!
  return {}
}

export default WrappedApp
