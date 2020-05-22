import {HomeOutlined, MessageOutlined, TeamOutlined} from '@ant-design/icons'
import React from 'react'

export interface SideMenuElement {
  items?: SideMenuElement[]

  key: string
  name: string
  group?: boolean
  href?: string
  icon?: any
}

export const sideMenu: SideMenuElement[] = [
  {
    key: 'home',
    name: 'Home',
    href: '/',
    icon: <HomeOutlined />,
  },
  {
    key: 'communication',
    name: 'Communication',
    group: true,
    items: [
      {
        key: 'users',
        name: 'Users',
        href: '/users',
        icon: <TeamOutlined />,
      },
      {
        key: 'chats',
        name: 'Chats',
        href: '/chats',
        icon: <MessageOutlined />,
      },
    ],
  },
]
