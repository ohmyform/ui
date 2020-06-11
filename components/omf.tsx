import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { SETTINGS_QUERY, SettingsQueryData } from '../graphql/query/settings.query'
import scss from './omf.module.scss'

export const Omf: React.FC = () => {
  const { data, loading } = useQuery<SettingsQueryData>(SETTINGS_QUERY)

  if (loading || data.hideContrib.value) {
    return null
  }

  return (
    <a className={scss.badge} href="https://ohmyform.com" target={'_blank'} rel={'noreferrer'}>
      <span>OhMyForm</span>
      <span>Fork & Support!</span>
    </a>
  )
}
