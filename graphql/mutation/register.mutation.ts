import { gql } from 'apollo-boost'

export interface RegisterMutationData {
  tokens: {
    access: string
    refresh: string
  }
}

export interface RegisterUserData {
  username: string
  email: string
  password: string
}

export interface RegisterMutationVariables {
  user: RegisterUserData
}

export const REGISTER_MUTATION = gql`
  mutation register($user: UserCreateInput!) {
    tokens: authRegister(user: $user) {
      access: accessToken
      refresh: refreshToken
    }
  }
`
