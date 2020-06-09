import { gql } from 'apollo-boost'

export const REGISTER_MUTATION = gql`
  mutation register($user: UserCreateInput!) {
    tokens: authRegister(user: $user) {
      access: accessToken
      refresh: refreshToken
    }
  }
`
