import { useQuery } from '@apollo/react-hooks'
import { Button, Progress, Table } from 'antd'
import { PaginationProps } from 'antd/es/pagination'
import { ProgressProps } from 'antd/lib/progress'
import { ColumnsType } from 'antd/lib/table/interface'
import { DateTime } from 'components/date.time'
import Structure from 'components/structure'
import { TimeAgo } from 'components/time.ago'
import { withAuth } from 'components/with.auth'
import dayjs from 'dayjs'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SubmissionValues } from '../../../../components/form/admin/submission.values'
import {
  ADMIN_PAGER_SUBMISSION_QUERY,
  AdminPagerSubmissionEntryQueryData,
  AdminPagerSubmissionFormQueryData,
  AdminPagerSubmissionQueryData,
  AdminPagerSubmissionQueryVariables,
} from '../../../../graphql/query/admin.pager.submission.query'

const Submissions: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [pagination, setPagination] = useState<PaginationProps>({
    pageSize: 25,
  })
  const [form, setForm] = useState<AdminPagerSubmissionFormQueryData>()
  const [entries, setEntries] = useState<AdminPagerSubmissionEntryQueryData[]>()
  const { loading, refetch } = useQuery<
    AdminPagerSubmissionQueryData,
    AdminPagerSubmissionQueryVariables
  >(ADMIN_PAGER_SUBMISSION_QUERY, {
    variables: {
      form: router.query.id as string,
      limit: pagination.pageSize,
      start: Math.max(0, pagination.current - 1) * pagination.pageSize || 0,
    },
    onCompleted: ({ pager, form }) => {
      setPagination({
        ...pagination,
        total: pager.total,
      })
      setForm(form)
      setEntries(pager.entries)
    },
  })

  const columns: ColumnsType<AdminPagerSubmissionEntryQueryData> = [
    {
      title: t('submission:progress'),
      render(row: AdminPagerSubmissionEntryQueryData) {
        const props: ProgressProps = {
          status: 'active',
          percent: Math.round(row.percentageComplete * 100),
        }

        if (row.percentageComplete >= 1) {
          props.status = 'success'
        } else if (dayjs().diff(dayjs(row.lastModified), 'hour') > 4) {
          props.status = 'exception'
        }

        return <Progress {...props} />
      },
    },
    {
      title: t('submission:created'),
      dataIndex: 'created',
      render(date: string) {
        return <DateTime date={date} />
      },
      responsive: ['lg'],
    },
    {
      title: t('submission:lastModified'),
      dataIndex: 'lastModified',
      render(date: string) {
        return <TimeAgo date={date} />
      },
      responsive: ['lg'],
    },
  ]

  return (
    <Structure
      title={t('admin:submissions')}
      selected={'forms'}
      loading={loading}
      breadcrumbs={[
        { href: '/admin', name: t('admin:home') },
        { href: '/admin/forms', name: t('admin:forms') },
        {
          href: '/admin/forms/[id]',
          name: loading || !form ? t('form:loading') : t('form:mange', { title: form.title }),
          as: `/admin/forms/${router.query.id as string}`,
        },
      ]}
      padded={false}
      extra={[
        <Link
          key={'edit'}
          href={'/admin/forms/[id]'}
          as={`/admin/forms/${router.query.id as string}`}
        >
          <Button>{t('submission:edit')}</Button>
        </Link>,
        <Button
          key={'web'}
          href={`/form/${router.query.id as string}`}
          target={'_blank'}
          type={'primary'}
        >
          {t('submission:add')}
        </Button>,
      ]}
    >
      <Table
        columns={columns}
        dataSource={entries}
        rowKey={'id'}
        pagination={pagination}
        expandable={{
          expandedRowRender(record) {
            return <SubmissionValues form={form} submission={record} />
          },
          rowExpandable(record) {
            return record.percentageComplete > 0
          },
        }}
        onChange={async (next) => {
          setPagination(next)
          await refetch()
        }}
      />
    </Structure>
  )
}

export default withAuth(Submissions, ['admin'])
