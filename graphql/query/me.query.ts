import { gql } from 'apollo-boost'

export interface MeQueryData {
  me: {
    id: string
    username: string
    roles: string[]
  }
}

export const ME_QUERY = gql`
  query {
    me {
      id
      roles
      username
    }
  }
`
