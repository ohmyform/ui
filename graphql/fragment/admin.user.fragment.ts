import {gql} from 'apollo-boost'

export const ADMIN_FORM_FRAGMENT = gql`
  fragment AdminUser on User {
    id
  }
`
