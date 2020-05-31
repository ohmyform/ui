import {useQuery} from '@apollo/react-hooks'
import {Col, Row, Statistic} from 'antd'
import Structure from 'components/structure'
import {withAuth} from 'components/with.auth'
import {NextPage} from 'next'
import React from 'react'
import {
  ADMIN_STATISTIC_QUERY,
  AdminStatisticQueryData,
  AdminStatisticQueryVariables
} from '../../graphql/query/admin.statistic.query'

const Index: NextPage = () => {
  const {data, loading} = useQuery<AdminStatisticQueryData, AdminStatisticQueryVariables>(ADMIN_STATISTIC_QUERY)

  return (
    <Structure
      title={'Home'}
      selected={'home'}
      loading={loading}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="Total Forms" value={data && data.forms.total} />
        </Col>

        <Col span={8}>
          <Statistic title="Total Users" value={data && data.users.total} />
        </Col>

        <Col span={8}>
          <Statistic title="Total Submissions" value={data && data.submissions.total} />
        </Col>
      </Row>
    </Structure>
  )
}

export default withAuth(Index, ['admin'])
