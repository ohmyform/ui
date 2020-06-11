import { gql } from 'apollo-boost'

export interface SettingsQueryData {
  disabledSignUp: {
    value: boolean
  }
  loginNote: {
    value: string
  }
}

export const SETTINGS_QUERY = gql`
  query {
    disabledSignUp: getSetting(key: "SIGNUP_DISABLED") {
      value: isTrue
    }
    loginNote: getSetting(key: "LOGIN_NOTE") {
      value
    }
  }
`
