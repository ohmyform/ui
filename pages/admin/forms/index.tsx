import {DeleteOutlined, EditOutlined, GlobalOutlined} from '@ant-design/icons/lib'
import {useQuery} from '@apollo/react-hooks'
import {Button, Popconfirm, Space, Table, Tooltip} from 'antd'
import {PaginationProps} from 'antd/es/pagination'
import {NextPage} from 'next'
import Link from 'next/link'
import React, {useState} from 'react'
import {DateTime} from '../../../components/date.time'
import {FormIsLive} from '../../../components/form/admin/is.live'
import Structure from '../../../components/structure'
import {TimeAgo} from '../../../components/time.ago'
import {withAuth} from '../../../components/with.auth'
import {
  PAGER_FORM_QUERY,
  PagerFormEntryQueryData,
  PagerFormQueryData,
  PagerFormQueryVariables
} from '../../../graphql/query/pager.form.query'

const Index: NextPage = () => {
  const [pagination, setPagination] = useState<PaginationProps>({
    pageSize: 25,
  })
  const [entries, setEntries] = useState<PagerFormEntryQueryData[]>()
  // TODO limit forms if user is only admin!
  const {loading, refetch} = useQuery<PagerFormQueryData, PagerFormQueryVariables>(PAGER_FORM_QUERY, {
    variables: {
      limit: pagination.pageSize,
      start: pagination.current * pagination.pageSize || 0
    },
    onCompleted: ({pager}) => {
      setPagination({
        ...pagination,
        total: pager.total,
      })
      setEntries(pager.entries)
    }
  })

  const deleteForm = async (form) => {
    // TODO
  }

  const columns = [
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
      render: row => {
        return (
          <Space>
            <Link
              href={'/admin/forms/[id]'}
              as={`/admin/forms/${row.id}`}
            >
              <Button type={'primary'}><EditOutlined /></Button>
            </Link>

            <Popconfirm
              title="Are you sure delete this form?"
              onConfirm={deleteForm}
              okText={'Delete now!'}
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

export default withAuth(Index, ['admin'])
