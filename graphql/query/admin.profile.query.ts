import { gql } from 'apollo-boost'
import { ADMIN_PROFILE_FRAGMENT, AdminProfileFragment } from '../fragment/admin.profile.fragment'

export interface AdminProfileQueryData {
  user: AdminProfileFragment
}

export interface AdminProfileQueryVariables {}

export const ADMIN_PROFILE_QUERY = gql`
  query profile {
    user: me {
      ...AdminProfile
    }
  }

  ${ADMIN_PROFILE_FRAGMENT}
`
