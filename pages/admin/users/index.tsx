import Structure from 'components/structure'
import {withAuth} from 'components/with.auth'
import {NextPage} from 'next'
import React from 'react'

const Index: NextPage = () => {
  return (
    <Structure
      title={'Users'}
      breadcrumbs={[
        { href: '/admin', name: 'Home' },
      ]}
    >
      ok!
    </Structure>
  )
}

export default withAuth(Index, ['admin'])
