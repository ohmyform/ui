import {gql} from 'apollo-boost'
import {ADMIN_PROFILE_FRAGMENT} from '../fragment/admin.profile.fragment'
import {AdminUserFragment} from '../fragment/admin.user.fragment'

export interface AdminProfileUpdateMutationData {
  user: AdminUserFragment
}

export interface AdminProfileUpdateMutationVariables {
  user: AdminUserFragment
}

export const ADMIN_PROFILE_UPDATE_MUTATION = gql`
  mutation update($user: ProfileUpdateInput!) {
    form: updateProfile(user: $user) {
      ...AdminProfile
    }
  }
  
  ${ADMIN_PROFILE_FRAGMENT}
`
