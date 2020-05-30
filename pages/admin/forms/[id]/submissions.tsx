import {EditOutlined} from '@ant-design/icons/lib'
import {useQuery} from '@apollo/react-hooks'
import {Button, Space, Table} from 'antd'
import {PaginationProps} from 'antd/es/pagination'
import {DateTime} from 'components/date.time'
import Structure from 'components/structure'
import {TimeAgo} from 'components/time.ago'
import {withAuth} from 'components/with.auth'
import {NextPage} from 'next'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
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
      start: pagination.current * pagination.pageSize || 0
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

  const columns = [
    {
      title: 'Values',
      dataIndex: 'fields',
      render: fields => <pre>{JSON.stringify(fields, null, 2)}</pre>
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
    {
      render: row => {
        return (
          <Space>
            <Link
              href={'/admin/forms/[id]'}
              as={`/admin/forms/${row.id}`}
            >
              <Button type={'primary'}><EditOutlined /></Button>
            </Link>

          </Space>
        )
      }
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
          href={`/forms/${router.query.id}`}
          target={'_blank'}
          type={'primary'}
        >
          Open Form
        </Button>,
      ]}
    >
      <Table
        columns={columns}
        dataSource={entries}
        rowKey={'id'}
        pagination={pagination}
        onChange={next => {
          setPagination(pagination)
        }}
      />
    </Structure>
  )
}

export default withAuth(Submissions, ['admin'])
