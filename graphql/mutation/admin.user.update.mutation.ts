import { gql } from 'apollo-boost'
import { ADMIN_USER_FRAGMENT, AdminUserFragment } from '../fragment/admin.user.fragment'

export interface AdminUserUpdateMutationData {
  user: AdminUserFragment
}

export interface AdminUserUpdateMutationVariables {
  user: AdminUserFragment
}

export const ADMIN_USER_UPDATE_MUTATION = gql`
  mutation update($user: UserUpdateInput!) {
    form: updateUser(user: $user) {
      ...AdminUser
    }
  }

  ${ADMIN_USER_FRAGMENT}
`
