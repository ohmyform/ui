import { DeleteOutlined, EditOutlined } from '@ant-design/icons/lib'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd'
import { PaginationProps } from 'antd/es/pagination'
import { ColumnsType } from 'antd/lib/table/interface'
import Structure from 'components/structure'
import { withAuth } from 'components/with.auth'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DateTime } from '../../../components/date.time'
import {useWindowSize} from '../../../components/use.window.size'
import { UserRole } from '../../../components/user/role'
import {
  ADMIN_USER_DELETE_MUTATION,
  AdminUserDeleteMutationData,
  AdminUserDeleteMutationVariables,
} from '../../../graphql/mutation/admin.user.delete.mutation'
import {
  ADMIN_PAGER_USER_QUERY,
  AdminPagerUserEntryQueryData,
  AdminPagerUserQueryData,
  AdminPagerUserQueryVariables,
} from '../../../graphql/query/admin.pager.user.query'

const Index: NextPage = () => {
  const { width } = useWindowSize()
  const { t } = useTranslation()
  const [pagination, setPagination] = useState<PaginationProps>({
    pageSize: 10,
  })
  const [entries, setEntries] = useState<AdminPagerUserEntryQueryData[]>()
  const { loading, refetch } = useQuery<AdminPagerUserQueryData, AdminPagerUserQueryVariables>(
    ADMIN_PAGER_USER_QUERY,
    {
      variables: {
        limit: pagination.pageSize,
        start: Math.max(0, pagination.current - 1) * pagination.pageSize || 0,
      },
      onCompleted: ({ pager }) => {
        setPagination({
          ...pagination,
          total: pager.total,
        })
        setEntries(pager.entries)
      },
    }
  )
  const [executeDelete] = useMutation<
    AdminUserDeleteMutationData,
    AdminUserDeleteMutationVariables
  >(ADMIN_USER_DELETE_MUTATION)

  const deleteUser = async (form: AdminPagerUserEntryQueryData) => {
    try {
      await executeDelete({
        variables: {
          id: form.id,
        },
      })
      const next = entries.filter((entry) => entry.id !== form.id)
      if (next.length === 0) {
        setPagination({ ...pagination, current: 1 })
      } else {
        setEntries(next)
      }
      await message.success(t('user:deleted'))
    } catch (e) {
      await message.error(t('user:deleteError'))
    }
  }

  const columns: ColumnsType<AdminPagerUserEntryQueryData> = [
    {
      title: t('user:row.roles'),
      dataIndex: 'roles',
      render(roles: string[]) {
        return <UserRole roles={roles} />
      },
      responsive: ['md'],
    },
    {
      title: t('user:row.email'),
      render(row: AdminPagerUserEntryQueryData) {
        return <Tag color={row.verifiedEmail ? 'lime' : 'volcano'}>{row.email}</Tag>
      },
    },
    {
      title: t('user:row.created'),
      dataIndex: 'created',
      render(date: string) {
        return <DateTime date={date} />
      },
      responsive: ['lg'],
    },
    {
      title: t('user:row.menu'),
      align: 'right',
      render(row: AdminPagerUserEntryQueryData) {
        return (
          <Space direction={width < 600 ? 'vertical' : 'horizontal'}>
            <Link href={'/admin/users/[id]'} as={`/admin/users/${row.id}`}>
              <Button type={'primary'}>
                <EditOutlined />
              </Button>
            </Link>

            <Popconfirm
              title={t('user:confirmDelete')}
              onConfirm={() => deleteUser(row)}
              okText={t('user:deleteNow')}
              okButtonProps={{ danger: true }}
            >
              <Button danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  return (
    <Structure
      title={t('admin:users')}
      loading={loading}
      breadcrumbs={[{ href: '/admin', name: t('admin:home') }]}
      padded={false}
    >
      <Table
        columns={columns}
        dataSource={entries}
        rowKey={'id'}
        pagination={pagination}
        onChange={async (next) => {
          setPagination(next)
          await refetch()
        }}
      />
    </Structure>
  )
}

export default withAuth(Index, ['admin'])
