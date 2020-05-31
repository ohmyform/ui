import {useQuery} from '@apollo/react-hooks'
import {Button, Progress, Table} from 'antd'
import {PaginationProps} from 'antd/es/pagination'
import {ColumnsType} from 'antd/lib/table/interface'
import {DateTime} from 'components/date.time'
import Structure from 'components/structure'
import {TimeAgo} from 'components/time.ago'
import {withAuth} from 'components/with.auth'
import dayjs from 'dayjs'
import {NextPage} from 'next'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {SubmissionValues} from '../../../../components/form/admin/submission.values'
import {
  ADMIN_PAGER_SUBMISSION_QUERY,
  AdminPagerSubmissionEntryQueryData,
  AdminPagerSubmissionFormQueryData,
  AdminPagerSubmissionQueryData,
  AdminPagerSubmissionQueryVariables
} from '../../../../graphql/query/admin.pager.submission.query'

const Submissions: NextPage = () => {
  const router = useRouter()
  const [pagination, setPagination] = useState<PaginationProps>({
    pageSize: 25,
  })
  const [form, setForm] = useState<AdminPagerSubmissionFormQueryData>()
  const [entries, setEntries] = useState<AdminPagerSubmissionEntryQueryData[]>()
  const {loading, refetch} = useQuery<AdminPagerSubmissionQueryData, AdminPagerSubmissionQueryVariables>(ADMIN_PAGER_SUBMISSION_QUERY, {
    variables: {
      form: router.query.id as string,
      limit: pagination.pageSize,
      start: Math.max(0, pagination.current - 1) * pagination.pageSize || 0
    },
    onCompleted: ({pager, form}) => {
      setPagination({
        ...pagination,
        total: pager.total,
      })
      setForm(form)
      setEntries(pager.entries)
    }
  })

  const columns:ColumnsType<AdminPagerSubmissionEntryQueryData> = [
    {
      title: 'Progress',
      render: (row: AdminPagerSubmissionEntryQueryData) => {
        let status: any = 'active'

        if (row.percentageComplete >= 1) {
          status = 'success'
        } else if (dayjs().diff(dayjs(row.lastModified), 'hour') > 4) {
          status = 'exception'
        }

        return (
          <Progress percent={Math.round(row.percentageComplete * 100)} status={status} />
        )
      }
    },
    {
      title: 'Created',
      dataIndex: 'created',
      render: date => <DateTime date={date} />
    },
    {
      title: 'Last Change',
      dataIndex: 'lastModified',
      render: date => <TimeAgo date={date} />
    },
  ]

  return (
    <Structure
      title={loading ? 'Loading Submissions' : 'Submissions'}
      selected={'forms'}
      loading={loading}
      breadcrumbs={[
        { href: '/admin', name: 'Home' },
        { href: '/admin/forms', name: 'Form' },
        { href: '/admin/forms/[id]', name: loading || !form ? 'Loading Form' : `Edit Form "${form.title}"`, as: `/admin/forms/${router.query.id}` },
      ]}
      padded={false}
      extra={[
        <Link
          key={'edit'}
          href={'/admin/forms/[id]'}
          as={`/admin/forms/${router.query.id}`}
        >
          <Button>
            Edit
          </Button>
        </Link>,
        <Button
          key={'web'}
          href={`/form/${router.query.id}`}
          target={'_blank'}
          type={'primary'}
        >
          Add Submission
        </Button>,
      ]}
    >
      <Table
        columns={columns}
        dataSource={entries}
        rowKey={'id'}
        pagination={pagination}
        expandable={{
          expandedRowRender: record => <SubmissionValues form={form} submission={record} />,
          rowExpandable: record => record.percentageComplete > 0,
        }}
        onChange={next => {
          setPagination(next)
          refetch()
        }}
      />
    </Structure>
  )
}

export default withAuth(Submissions, ['admin'])
