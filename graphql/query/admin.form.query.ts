import { gql } from 'apollo-boost'
import { ADMIN_FORM_FRAGMENT, AdminFormFragment } from '../fragment/admin.form.fragment'

export interface AdminFormQueryData {
  form: AdminFormFragment
}

export interface AdminFormQueryVariables {
  id: string
}

export const ADMIN_FORM_QUERY = gql`
  query form($id: ID!) {
    form: getFormById(id: $id) {
      ...AdminForm
    }
  }

  ${ADMIN_FORM_FRAGMENT}
`
