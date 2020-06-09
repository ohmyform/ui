import { gql } from 'apollo-boost'
import { FORM_FRAGMENT, FormFragment } from '../fragment/form.fragment'

export interface FormQueryData {
  form: FormFragment
}

export interface FormQueryVariables {
  id: string
}

export const FORM_QUERY = gql`
  query form($id: ID!) {
    form: getFormById(id: $id) {
      ...Form
    }
  }

  ${FORM_FRAGMENT}
`
