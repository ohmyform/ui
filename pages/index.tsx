import {Alert} from 'antd'
import {withAuth} from 'components/with.auth'
import {NextPage} from 'next'
import React from 'react'
import Structure from '../components/structure'

const Index: NextPage = () => {
  return (
    <Structure
      selected={'home'}
      title={'Home'}
    >
      <Alert message={"Hi"}/>
    </Structure>
  )
}

export default withAuth(Index)
