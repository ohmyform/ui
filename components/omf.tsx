import React from 'react'
import scss from './omf.module.scss'

export const Omf: React.FC = () => {
  return (
    <a className={scss.badge} href="https://ohmyform.com" target={'_blank'} rel={'noreferrer'}>
      <span>OhMyForm</span>
      <span>Fork & Support!</span>
    </a>
  )
}
