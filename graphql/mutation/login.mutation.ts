import { gql } from 'apollo-boost'

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    tokens: authLogin(username: $username, password: $password) {
      access: accessToken
      refresh: refreshToken
    }
  }
`
