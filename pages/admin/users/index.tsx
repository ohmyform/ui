import {DeleteOutlined, EditOutlined} from '@ant-design/icons/lib'
import {useMutation, useQuery} from '@apollo/react-hooks'
import {Button, message, Popconfirm, Space, Table, Tag} from 'antd'
import {PaginationProps} from 'antd/es/pagination'
import {ColumnsType} from 'antd/lib/table/interface'
import Structure from 'components/structure'
import {withAuth} from 'components/with.auth'
import {NextPage} from 'next'
import Link from 'next/link'
import React, {useState} from 'react'
import {DateTime} from '../../../components/date.time'
import {UserRole} from '../../../components/user/role'
import {
  ADMIN_USER_DELETE_MUTATION,
  AdminUserDeleteMutationData,
  AdminUserDeleteMutationVariables
} from '../../../graphql/mutation/admin.user.delete.mutation'
import {
  ADMIN_PAGER_USER_QUERY,
  AdminPagerUserEntryQueryData,
  AdminPagerUserQueryData,
  AdminPagerUserQueryVariables
} from '../../../graphql/query/admin.pager.user.query'

const Index: NextPage = () => {
  const [pagination, setPagination] = useState<PaginationProps>({
    pageSize: 10,
  })
  const [entries, setEntries] = useState<AdminPagerUserEntryQueryData[]>()
  const {loading, refetch} = useQuery<AdminPagerUserQueryData, AdminPagerUserQueryVariables>(ADMIN_PAGER_USER_QUERY, {
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
  const [executeDelete] = useMutation<AdminUserDeleteMutationData, AdminUserDeleteMutationVariables>(ADMIN_USER_DELETE_MUTATION)

  const deleteUser = async (form) => {
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
      message.success('user deleted')
    } catch (e) {
      message.error('could not delete user')
    }
  }

  const columns: ColumnsType<AdminPagerUserEntryQueryData> = [
    {
      title: 'Role',
      dataIndex: 'roles',
      render: roles => <UserRole roles={roles} />
    },
    {
      title: 'Email',
      render: row => <Tag color={row.verifiedEmail ? 'lime' : 'volcano' }>{row.email}</Tag>
    },
    {
      title: 'Created',
      dataIndex: 'created',
      render: date => <DateTime date={date} />
    },
    {
      align: 'right',
      render: row => {
        return (
          <Space>
            <Link
              href={'/admin/users/[id]'}
              as={`/admin/users/${row.id}`}
            >
              <Button type={'primary'}><EditOutlined /></Button>
            </Link>

            <Popconfirm
              title="Are you sure delete this user?"
              onConfirm={() => deleteUser(row)}
              okText={'Delete now!'}
              okButtonProps={{ danger: true }}
            >
              <Button danger><DeleteOutlined /></Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ]

  return (
    <Structure
      title={'Users'}
      loading={loading}
      breadcrumbs={[
        { href: '/admin', name: 'Home' },
      ]}
      padded={false}
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
