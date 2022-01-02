import { message } from 'antd'
import ExcelJS, { CellValue } from 'exceljs'
import { useCallback, useState } from 'react'
import { SubmissionFragment } from '../../../graphql/fragment/submission.fragment'
import { useFormQuery } from '../../../graphql/query/form.query'
import { useSubmissionPagerImperativeQuery } from '../../../graphql/query/submission.pager.query'

interface Props {
  form: string
  trigger: (open: () => any, loading: boolean) => JSX.Element
}

export const ExportSubmissionAction: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false)

  const form = useFormQuery({
    variables: {
      id: props.form,
    },
  })

  const getSubmissions = useSubmissionPagerImperativeQuery()

  const exportSubmissions = useCallback(async () => {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const workbook = new ExcelJS.Workbook()
      workbook.creator = 'OhMyForm'
      workbook.lastModifiedBy = 'OhMyForm'
      workbook.created = new Date()
      workbook.modified = new Date()

      const sheet = workbook.addWorksheet('Submissions')
      sheet.getRow(1).values = [
        'Submission ID',
        'Created',
        'Last Change',
        'Country',
        'City',
        'User Agent',
        'Device',
        ...form.data.form.fields.map((field) => `${field.title} (${field.type})`),
      ]

      const firstPage = await getSubmissions({
        form: props.form,
        limit: 50,
        start: 0,
      })

      const buildRow = (data: SubmissionFragment): CellValue[] => {
        const row: CellValue[] = [
          data.id,
          data.created,
          data.lastModified,
          data.geoLocation.country,
          data.geoLocation.city,
          data.device.type,
          data.device.name,
        ]

        data.fields.forEach((field) => {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const decoded: { value: CellValue } = JSON.parse(field.value)
            row.push(decoded.value || '')
          } catch (e) {
            row.push('')
          }
        })

        return row
      }

      firstPage.data.pager.entries.forEach((row, index) => {
        sheet.getRow(index + 2).values = buildRow(row)
      })

      const pages = Math.ceil(firstPage.data.pager.total / 50)
      for (let page = 1; page < pages; page++) {
        // now process each page!
        const next = await getSubmissions({
          form: props.form,
          limit: 50,
          start: page * 50,
        })

        next.data.pager.entries.forEach((row, index) => {
          sheet.getRow(index + 2 + page * 50).values = buildRow(row)
        })
      }

      const buffer = await workbook.xlsx.writeBuffer()

      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(new Blob([buffer], { type: 'application/xlsx' }))
      link.download = 'submissions.xlsx'
      link.click()
    } catch (e) {
      console.log('error', e)
      void message.error({
        content: 'Failed to generate export',
      })
    }
    setLoading(false)
  }, [
    form, getSubmissions, props.form, setLoading, loading,
  ])

  return props.trigger(() => exportSubmissions(), loading)
}
