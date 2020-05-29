import {NextPage} from 'next'
import React from 'react'
import Structure from '../../../../components/structure'
import {withAuth} from '../../../../components/with.auth'

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
