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
    href: '/admin',
    icon: <HomeOutlined />,
  },
  {
    key: 'public',
    name: 'Forms',
    group: true,
    items: [
      {
        key: 'forms',
        name: 'Forms',
        href: '/admin/forms',
        icon: <MessageOutlined />,
      },
    ]
  },
  {
    key: 'administration',
    name: 'Administration',
    group: true,
    items: [
      {
        key: 'users',
        name: 'Users',
        href: '/admin/users',
        icon: <TeamOutlined />,
      },
    ],
  },
]
