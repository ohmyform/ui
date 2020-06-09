import { gql } from 'apollo-boost'

export interface AdminPagerUserEntryQueryData {
  id: string
  roles: string[]
  verifiedEmail: boolean
  email: string
  created: string
}

export interface AdminPagerUserQueryData {
  pager: {
    entries: AdminPagerUserEntryQueryData[]

    total: number
    limit: number
    start: number
  }
}

export interface AdminPagerUserQueryVariables {
  start?: number
  limit?: number
}

export const ADMIN_PAGER_USER_QUERY = gql`
  query pager($start: Int, $limit: Int) {
    pager: listUsers(start: $start, limit: $limit) {
      entries {
        id
        roles
        verifiedEmail
        email
        created
      }
      total
      limit
      start
    }
  }
`
