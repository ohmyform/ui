import 'antd/dist/antd.css'
import 'assets/global.scss'
import 'assets/variables.scss'
import {AppProps} from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import React from 'react'
import {wrapper} from 'store'

const { publicRuntimeConfig } = getConfig()

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>OhMyForm</title>
        <meta name="theme-color" content={'#4182e4'} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(App)
// export default App
