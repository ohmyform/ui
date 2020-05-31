import {Descriptions, Table} from 'antd'
import {ColumnsType} from 'antd/lib/table/interface'
import React from 'react'
import {
  AdminPagerSubmissionEntryFieldQueryData,
  AdminPagerSubmissionEntryQueryData,
  AdminPagerSubmissionFormQueryData
} from '../../../graphql/query/admin.pager.submission.query'

interface Props {
  form: AdminPagerSubmissionFormQueryData
  submission: AdminPagerSubmissionEntryQueryData
}

export const SubmissionValues: React.FC<Props> = props => {
  const columns: ColumnsType<AdminPagerSubmissionEntryFieldQueryData> = [
    {
      title: 'Field',
      render: (row: AdminPagerSubmissionEntryFieldQueryData) => {

        if (row.field) {
          return `${row.field.title}${row.field.required ? '*' : ''}`
        }

        return `${row.id}`
      }
    },
    {
      title: 'Value',
      render: row => {
        try {
          const data = JSON.parse(row.value)

          return data.value
        } catch (e) {
          return row.value
        }
      }
    }
  ]

  return (
    <div>
      <Descriptions title={'Submission'}>
        <Descriptions.Item label="Country">{props.submission.geoLocation.country}</Descriptions.Item>
        <Descriptions.Item label="City">{props.submission.geoLocation.city}</Descriptions.Item>
        <Descriptions.Item label="Device Type">{props.submission.device.type}</Descriptions.Item>
        <Descriptions.Item label="Device Name">{props.submission.device.name}</Descriptions.Item>
      </Descriptions>

      <Table
        columns={columns}
        dataSource={props.submission.fields}
        rowKey={'id'}
      />
    </div>
  )
}
