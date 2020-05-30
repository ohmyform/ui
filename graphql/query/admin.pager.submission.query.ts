import {gql} from 'apollo-boost'

export interface AdminPagerSubmissionFormQueryData {
  id: string
  title: string
  isLive: boolean
}

export interface AdminPagerSubmissionEntryQueryData {
  id: string
  created: string
  lastModified?: string
  percentageComplete: number
  timeElapsed: number
  geoLocation: {
    country: string
  }
}

export interface AdminPagerSubmissionQueryData {
  pager: {
    entries: AdminPagerSubmissionEntryQueryData[]

    total: number
    limit: number
    start: number
  }

  form: AdminPagerSubmissionFormQueryData
}

export interface AdminPagerSubmissionQueryVariables {
  form: string
  start?: number
  limit?: number
}

export const ADMIN_PAGER_SUBMISSION_QUERY = gql`
  query pager($form: ID!, $start: Int, $limit: Int){
    form: getFormById(id: $form) {
      id
      title
      isLive
    }
  
    pager: listSubmissions(form: $form, start: $start, limit: $limit) {
      entries {
        id
        created
        lastModified
        percentageComplete
        timeElapsed
        geoLocation {
          country
        }
        
        fields {
          id
          value
          type
        }
      }
      total    
      limit
      start
    }
  }
`
