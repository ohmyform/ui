import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import 'isomorphic-fetch'
import getConfig from 'next/config'
import { NextConfigType } from '../next.config.type'

let client: ApolloClient<any>

const getClient = (): ApolloClient<any> => {
  if (!client) {
    const config = getConfig() as NextConfigType

    if (!config) return client

    const { publicRuntimeConfig, serverRuntimeConfig } = config

    client = new ApolloClient({
      cache: new InMemoryCache(),
      link: from([
        setContext((request, context) => {
          const headers: { [key: string]: string } = {}

          if (process.browser) {
            const access = localStorage.getItem('access')

            if (access) {
              headers.authorization = `Bearer ${access}`
            }
          }

          return {
            headers,
          }
        }),
        new HttpLink({
          uri: serverRuntimeConfig.endpoint || publicRuntimeConfig.endpoint,
        }),
      ]),
    })
  }

  return client
}

export default getClient
