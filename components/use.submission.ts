import {useMutation} from '@apollo/react-hooks'
import {useCallback, useEffect, useState} from 'react'
import {
  SUBMISSION_SET_FIELD_MUTATION,
  SubmissionSetFieldMutationData,
  SubmissionSetFieldMutationVariables
} from '../graphql/mutation/submission.set.field.mutation'
import {
  SUBMISSION_START_MUTATION,
  SubmissionStartMutationData,
  SubmissionStartMutationVariables
} from '../graphql/mutation/submission.start.mutation'

export const useSubmission = (formId: string) => {
  const [submission, setSubmission] = useState<{ id: string, token: string }>()

  const [start] = useMutation<SubmissionStartMutationData, SubmissionStartMutationVariables>(SUBMISSION_START_MUTATION)
  const [save] = useMutation<SubmissionSetFieldMutationData, SubmissionSetFieldMutationVariables>(SUBMISSION_SET_FIELD_MUTATION)

  useEffect(() => {
    (async () => {
      const token = '123' // TODO generate secure token

      const {data} = await start({
        variables: {
          form: formId,
          submission: {
            token,
            device: {
              name: '',
              type: ''
            }
          }
        }
      })

      setSubmission({
        id: data.submission.id,
        token,
      })
    })()
  }, [formId])

  const setField = useCallback(async (fieldId: string, data: any) => {
    console.log('just save', fieldId, data)
    await save({
      variables: {
        submission: submission.id,
        field: {
          token: submission.token,
          field: fieldId,
          data: JSON.stringify(data)
        }
      }
    })
  }, [submission])

  const finish = useCallback(() => {
    console.log('finish submission!!', formId)
  }, [submission])

  console.log('submission saver :D', formId)

  return {
    setField,
    finish,
  }
}
