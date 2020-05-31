import {gql} from 'apollo-boost'

export interface AdminFormDeleteMutationData {
  form: {
    id
  }
}

export interface AdminFormDeleteMutationVariables {
  id: string
}

export const ADMIN_FORM_DELETE_MUTATION = gql`
  mutation delete($id: ID!) {
    form: deleteForm(id: $id) {
      id
    }
  }
`
