import Structure from 'components/structure'
import {withAuth} from 'components/with.auth'
import {NextPage} from 'next'
import React from 'react'

const Index: NextPage = () => {
  return (
    <Structure
      title={'Edit User'}
      breadcrumbs={[
        { href: '/admin', name: 'Home' },
        { href: '/admin/users', name: 'Users' },
      ]}
    >
      ok!
    </Structure>
  )
}

export default withAuth(Index, ['admin'])
