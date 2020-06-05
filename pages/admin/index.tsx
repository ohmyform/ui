import {useQuery} from '@apollo/react-hooks'
import {Col, Row, Statistic} from 'antd'
import Structure from 'components/structure'
import {withAuth} from 'components/with.auth'
import {NextPage} from 'next'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {
  ADMIN_STATISTIC_QUERY,
  AdminStatisticQueryData,
  AdminStatisticQueryVariables
} from '../../graphql/query/admin.statistic.query'

const Index: NextPage = () => {
  const { t } = useTranslation()
  const {data, loading} = useQuery<AdminStatisticQueryData, AdminStatisticQueryVariables>(ADMIN_STATISTIC_QUERY)

  return (
    <Structure
      title={t('admin:home')}
      selected={'home'}
      loading={loading}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title={t('statistic:totalForms')} value={data && data.forms.total} />
        </Col>

        <Col span={8}>
          <Statistic title={t('statistic:totalUsers')} value={data && data.users.total} />
        </Col>

        <Col span={8}>
          <Statistic title={t('statistic:totalSubmissions')} value={data && data.submissions.total} />
        </Col>
      </Row>
    </Structure>
  )
}

export default withAuth(Index, ['admin'])
