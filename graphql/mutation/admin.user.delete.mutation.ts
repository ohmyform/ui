import {gql} from 'apollo-boost'

export interface AdminUserDeleteMutationData {
  form: {
    id
  }
}

export interface AdminUserDeleteMutationVariables {
  id: string
}

export const ADMIN_USER_DELETE_MUTATION = gql`
  mutation delete($id: ID!) {
    form: deleteUser(id: $id) {
      id
    }
  }
`
