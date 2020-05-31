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
import {
  ADMIN_FORM_DELETE_MUTATION,
  AdminFormDeleteMutationData,
  AdminFormDeleteMutationVariables
} from '../../../graphql/mutation/admin.form.delete.mutation'

const Index: NextPage = () => {
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

      message.success('form deleted')
    } catch (e) {
      message.error('could not delete form')
    }
  }

  const columns: ColumnsType<AdminPagerFormEntryQueryData> = [
    {
      title: 'Live',
      dataIndex: 'isLive',
      render: live => <FormIsLive isLive={live} />
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Owner',
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
      title: 'Language',
      dataIndex: 'language',
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
              title="Are you sure delete this form with all submissions?"
              onConfirm={() => deleteForm(row)}
              okText={'Delete now!'}
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
      title={'Forms'}
      selected={'forms'}
      loading={loading}
      breadcrumbs={[
        { href: '/admin', name: 'Home' },
      ]}
      padded={false}
      extra={[
        <Link
          key={'create'}
          href={'/admin/forms/create'}
        >
          <Button
            type={'primary'}
          >
            New Form
          </Button>
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
