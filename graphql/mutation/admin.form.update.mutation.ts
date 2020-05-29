import {gql} from 'apollo-boost'
import {ADMIN_FORM_FRAGMENT, AdminFormFragment} from '../fragment/admin.form.fragment'

export interface AdminFormUpdateMutationData {
  form: AdminFormFragment
}

export interface AdminFormUpdateMutationVariables {
  form: AdminFormFragment
}

export const ADMIN_FORM_UPDATE_MUTATION = gql`
  mutation update($form: FormUpdateInput!) {
    form: updateForm(form: $form) {
      ...AdminForm
    }
  }
  
  ${ADMIN_FORM_FRAGMENT}
`
