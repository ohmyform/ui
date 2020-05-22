import {Spin} from 'antd'
import {AxiosRequestConfig} from 'axios'
import getConfig from 'next/config'
import React from 'react'

const { publicRuntimeConfig } = getConfig()

export const authConfig = async (config: AxiosRequestConfig = {}): Promise<AxiosRequestConfig> => {
  if (!config.headers) {
    config.headers = {}
  }

  try {
    // TODO config.headers.Authorization = `Bearer ${session.getAccessToken().getJwtToken()}`
  } catch (e) {
    return config
  }

  return config
}

export const withAuth = (Component): React.FC => {
  return props => {
    const [signedIn, setSignedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);


    React.useEffect(() => {
      (async () => {
        try {
        } catch (err) {
          console.error(err);
        }

        setLoading(false)
      })();
    }, []);

    if (loading) {
      return (
        <div style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Spin size="large"/>
        </div>
      )
    }

    if (!signedIn) {
      // TODO
    }

    return <Component {...props} />
  };
}
