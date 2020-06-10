import { useQuery } from '@apollo/react-hooks'
import { Button, Select } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SETTINGS_QUERY, SettingsQueryData } from '../../graphql/query/settings.query'
import { languages } from '../../i18n'
import { clearAuth, withAuth } from '../with.auth'
import scss from './footer.module.scss'

interface Props {
  me?: {
    id: string
    username: string
  }
}

const AuthFooterInner: React.FC<Props> = (props) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { data } = useQuery<SettingsQueryData>(SETTINGS_QUERY)

  const logout = () => {
    clearAuth()
    router.reload()
  }

  return (
    <footer className={scss.footer}>
      <Link href={'/admin'}>
        <Button type={'link'} ghost>
          {t('admin')}
        </Button>
      </Link>
      {props.me
        ? [
            <span style={{ color: '#FFF' }} key={'user'}>
              Hi, {props.me.username}
            </span>,
            <Button key={'logout'} type={'link'} ghost onClick={logout}>
              {t('logout')}
            </Button>,
          ]
        : [
            <Link href={'/login'} key={'login'}>
              <Button type={'link'} ghost>
                {t('login')}
              </Button>
            </Link>,
            <Link href={'/register'} key={'register'}>
              <Button type={'link'} ghost disabled={data ? data.disabledSignUp.value : false}>
                {t('register')}
              </Button>
            </Link>,
          ]}
      <div style={{ flex: 1 }} />
      <Select
        bordered={false}
        value={i18n.language.replace(/-.*/, '')}
        onChange={(next) => i18n.changeLanguage(next)}
        style={{
          color: '#FFF',
          paddingLeft: 18,
        }}
        suffixIcon={false}
      >
        {languages.map((language) => (
          <Select.Option value={language} key={language}>
            {t(`language:${language}`)}
          </Select.Option>
        ))}
      </Select>
      <Button
        type={'link'}
        target={'_blank'}
        rel={'noreferrer'}
        ghost
        href={'https://www.ohmyform.com'}
        style={{
          color: '#FFF',
        }}
      >
        &copy; OhMyForm
      </Button>
    </footer>
  )
}

export const AuthFooter = withAuth(AuthFooterInner)
