import {NextPage} from 'next'
import React from 'react'
import Structure from '../../components/structure'
import {withAuth} from '../../components/with.auth'

const Index: NextPage = () => {
  return (
    <Structure
      title={'Home'}
    >
      ok!
    </Structure>
  )
}

export default withAuth(Index, ['admin'])
