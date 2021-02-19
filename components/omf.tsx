import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { SETTINGS_QUERY, SettingsQueryData } from '../graphql/query/settings.query'
import scss from './omf.module.scss'

export const Omf: React.FC = () => {
  const { data, loading } = useQuery<SettingsQueryData>(SETTINGS_QUERY)

  if (loading || (data && data.hideContrib.value)) {
    return null
  }
}
