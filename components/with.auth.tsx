import {useQuery} from '@apollo/react-hooks'
import {AxiosRequestConfig} from 'axios'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {ME_QUERY, MeQueryData} from '../graphql/query/me.query'
import {LoadingPage} from './loading.page'

export const clearAuth = async () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')

  // TODO logout on server!
}

export const setAuth = (access, refresh) => {
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
}

export const authConfig = async (config: AxiosRequestConfig = {}): Promise<AxiosRequestConfig> => {
  if (!config.headers) {
    config.headers = {}
  }

  try {
    const token = localStorage.getItem('access')
    // TODO check for validity / use refresh token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (e) {
    return config
  }

  return config
}

export const withAuth = (Component, roles: string[] = []): React.FC => {
  return props => {
    const router = useRouter()
    const [access, setAccess] = useState(false)
    const {loading, data, error} = useQuery<MeQueryData>(ME_QUERY)

    useEffect(() => {
      if (roles.length === 0) {
        setAccess(true)
        return
      }
      setAccess(false)
      if (!error) {
        return
      }

      localStorage.clear()
      const path = router.asPath || router.pathname
      localStorage.setItem('redirect', path)

      router.push('/login')
    }, [error])

    useEffect(() => {
      if (!data || roles.length === 0) {
        setAccess(true)
        return
      }

      const next = roles
        .map(role => data.me.roles.includes(role))
        .filter(p => p)
        .length > 0

      setAccess(next)

      if (!next) {
        router.push('/')
      }
    }, [data])

    if (loading) {
      return <LoadingPage message={'Loading Credentials'} />
    }

    if (!access) {
      return <LoadingPage message={'Checking Credentials'} />
    }

    return <Component me={data && data.me} {...props} />
  };
}
