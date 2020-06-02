import {Button} from 'antd'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {clearAuth, withAuth} from '../with.auth'

interface Props {
  me?: {
    id: string
    username: string
  }
}

const AuthFooterInner: React.FC<Props> = props => {
  const { t } = useTranslation()
  const router = useRouter()

  const logout = () => {
    clearAuth()
    router.reload()
  }

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
          {t('admin')}
        </Button>
      </Link>
      {props.me ? (
        [
          <span style={{color: '#FFF'}} key={'user'}>
            Hi, {props.me.username}
          </span>,
          <Button
            key={'Logout'}
            type={'link'}
            ghost
            onClick={logout}
          >
            {t('logout')}
          </Button>
        ]
      ): (
        [
          <Link href={'/login'} key={'login'}>
            <Button
              type={'link'}
              ghost
            >
              {t('login')}
            </Button>
          </Link>,
          <Link href={'/register'} key={'register'}>
            <Button
              type={'link'}
              ghost
            >
              {t('register')}
            </Button>
          </Link>
        ]
      )}

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

export const AuthFooter = withAuth(AuthFooterInner)
