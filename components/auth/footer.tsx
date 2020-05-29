import {Button} from 'antd'
import Link from 'next/link'
import React from 'react'

export const AuthFooter: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Link href={'/admin'}>
        <Button
          type={'link'}
          ghost
        >
          Admin
        </Button>
      </Link>
      <Link href={'/login'}>
        <Button
          type={'link'}
          ghost
        >
          Login
        </Button>
      </Link>
      <Link href={'/register'}>
        <Button
          type={'link'}
          ghost
        >
          Register
        </Button>
      </Link>

      <Button
        type={'link'}
        target={'_blank'}
        ghost
        href={'https://www.ohmyform.com'}
        style={{
          float: 'right',
          color: '#FFF'
        }}
      >
        &copy; OhMyForm
      </Button>
    </div>
  )
}
