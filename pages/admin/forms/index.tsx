import {DeleteOutlined, EditOutlined, GlobalOutlined, UnorderedListOutlined} from '@ant-design/icons/lib'
import {useMutation, useQuery} from '@apollo/react-hooks'
import {Button, message, Popconfirm, Space, Table, Tooltip} from 'antd'
import {PaginationProps} from 'antd/es/pagination'
import {ColumnsType} from 'antd/lib/table/interface'
import {DateTime} from 'components/date.time'
import {FormIsLive} from 'components/form/admin/is.live'
import Structure from 'components/structure'
import {TimeAgo} from 'components/time.ago'
import {withAuth} from 'components/with.auth'
import {
  ADMIN_PAGER_FORM_QUERY,
  AdminPagerFormEntryQueryData,
  AdminPagerFormQueryData,
  AdminPagerFormQueryVariables
} from 'graphql/query/admin.pager.form.query'
import {NextPage} from 'next'
import Link from 'next/link'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {
  ADMIN_FORM_DELETE_MUTATION,
  AdminFormDeleteMutationData,
  AdminFormDeleteMutationVariables
} from '../../../graphql/mutation/admin.form.delete.mutation'

const Index: NextPage = () => {
  const { t } = useTranslation()
  const [pagination, setPagination] = useState<PaginationProps>({
    pageSize: 25,
  })
  const [entries, setEntries] = useState<AdminPagerFormEntryQueryData[]>()
  const {loading, refetch} = useQuery<AdminPagerFormQueryData, AdminPagerFormQueryVariables>(ADMIN_PAGER_FORM_QUERY, {
    variables: {
      limit: pagination.pageSize,
      start: Math.max(0, pagination.current - 1) * pagination.pageSize || 0
    },
    onCompleted: ({pager}) => {
      setPagination({
        ...pagination,
        total: pager.total,
      })
      setEntries(pager.entries)
    }
  })
  const [executeDelete] = useMutation<AdminFormDeleteMutationData, AdminFormDeleteMutationVariables>(ADMIN_FORM_DELETE_MUTATION)

  const deleteForm = async (form) => {
    try {
      await executeDelete({
        variables: {
          id: form.id
        }
      })
      const next = entries.filter(entry => entry.id !== form.id)
      if (next.length === 0) {
        setPagination({ ...pagination, current: 1 })
      } else {
        setEntries(next)
      }

      message.success(t('form:deleted'))
    } catch (e) {
      message.error(t('form:deleteError'))
    }
  }

  const columns: ColumnsType<AdminPagerFormEntryQueryData> = [
    {
      title: t('form:row.isLive'),
      dataIndex: 'isLive',
      render: live => <FormIsLive isLive={live} />
    },
    {
      title: t('form:row.title'),
      dataIndex: 'title',
    },
    {
      title: t('form:row.admin'),
      dataIndex: 'admin',
      render: user => (
        <Link href={'/admin/users/[id]'} as={`/admin/users/${user.id}`}>
          <Tooltip title={user.email}>
            <Button type={'dashed'}>{user.username}</Button>
          </Tooltip>
        </Link>
      )
    },
    {
      title: t('form:row.language'),
      dataIndex: 'language',
    },
    {
      title: t('form:row.created'),
      dataIndex: 'created',
      render: date => <DateTime date={date} />
    },
    {
      title: t('form:row.lastModified'),
      dataIndex: 'lastModified',
      render: date => <TimeAgo date={date} />
    },
    {
      title: t('form:row.menu'),
      align: 'right',
      render: row => {
        return (
          <Space>
            <Link
              href={'/admin/forms/[id]/submissions'}
              as={`/admin/forms/${row.id}/submissions`}
            >
              <Tooltip title={'Show Submissions'}>
                <Button><UnorderedListOutlined /></Button>
              </Tooltip>
            </Link>

            <Link
              href={'/admin/forms/[id]'}
              as={`/admin/forms/${row.id}`}
            >
              <Button type={'primary'}><EditOutlined /></Button>
            </Link>

            <Popconfirm
              title={t('form:confirmDelete')}
              onConfirm={() => deleteForm(row)}
              okText={t('form:deleteNow')}
              okButtonProps={{ danger: true }}
            >
              <Button danger><DeleteOutlined /></Button>
            </Popconfirm>

            <Tooltip title={row.isLive ? null : 'Not Public accessible!'}>
              <Button
                href={`/form/${row.id}`}
                target={'_blank'}
              >
                <GlobalOutlined />
              </Button>
            </Tooltip>
          </Space>
        )
      }
    },
  ]

  return (
    <Structure
      title={t('admin:forms')}
      selected={'forms'}
      loading={loading}
      breadcrumbs={[
        { href: '/admin', name: t('admin:home') },
      ]}
      padded={false}
      extra={[
        <Link
          key={'create'}
          href={'/admin/forms/create'}
        >
          <Button
            type={'primary'}
          >{t('form:new')}</Button>
        </Link>,
      ]}
    >
      <Table
        columns={columns}
        dataSource={entries}
        rowKey={'id'}
        pagination={pagination}
        onChange={next => {
          setPagination(next)
          refetch()
        }}
      />
    </Structure>
  )
}

export default withAuth(Index, ['admin'])
