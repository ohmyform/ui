import { Layout, Spin } from 'antd'
import React from 'react'

interface Props {
  loading?: boolean
}

export const AuthLayout: React.FC<Props> = (props) => {
  return (
    <Spin spinning={props.loading || false}>
      <Layout
        style={{
          height: '100vh',
          background: '#437fdc',
        }}
      >
        {props.children}
      </Layout>
    </Spin>
  )
}
