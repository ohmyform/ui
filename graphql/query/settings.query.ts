import {gql} from 'apollo-boost'

export interface SettingsQueryData {
  disabledSignUp: {
    value: boolean
  }
}

export const SETTINGS_QUERY = gql`
    query {
        disabledSignUp: getByKey (key: "SIGNUP_DISABLED") {
            value: isTrue
        }
    }
`
