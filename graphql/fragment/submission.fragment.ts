import { gql } from 'apollo-boost'

export interface SubmissionFragment {
  id?: string
  title: string
  created: string
}

export const FORM_FRAGMENT = gql`
  fragment Submission on Submission {
    id
    title
    language
    showFooter
  }
`
