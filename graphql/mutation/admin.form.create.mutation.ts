import {gql} from 'apollo-boost'
import {ADMIN_FORM_FRAGMENT, AdminFormFragment} from '../fragment/admin.form.fragment'

export interface AdminFormCreateMutationData {
  form: AdminFormFragment
}

export interface AdminFormCreateMutationVariables {
  form: AdminFormFragment
}

export const ADMIN_FORM_CREATE_MUTATION = gql`
  mutation update($form: FormCreateInput!) {
    form: createForm(form: $form) {
      ...AdminForm
    }
  }
  
  ${ADMIN_FORM_FRAGMENT}
`
