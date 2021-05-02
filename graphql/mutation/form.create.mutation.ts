import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { FORM_FRAGMENT, FormFragment } from '../fragment/form.fragment'

interface Data {
  form: FormFragment
}

interface Variables {
  form: {
    isLive: boolean
    language: string
    showFooter?: boolean
    title: string
  }
}

const MUTATION = gql`
  mutation update($form: FormCreateInput!) {
    form: createForm(form: $form) {
      ...Form
    }
  }

  ${FORM_FRAGMENT}
`

export const useFormCreateMutation = (
  data?: MutationHookOptions<Data, Variables>
): MutationTuple<Data, Variables> => useMutation<Data, Variables>(MUTATION, data)
