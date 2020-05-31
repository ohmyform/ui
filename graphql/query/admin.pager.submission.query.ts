import {gql} from 'apollo-boost'

export interface AdminPagerSubmissionFormFieldQueryData {
  title: string
  required: boolean
}

export interface AdminPagerSubmissionFormQueryData {
  id: string
  title: string
  isLive: boolean
}

export interface AdminPagerSubmissionEntryFieldQueryData {
  id: string
  value: string
  type: string

  field?: AdminPagerSubmissionFormFieldQueryData
}

export interface AdminPagerSubmissionEntryQueryData {
  id: string
  created: string
  lastModified?: string
  percentageComplete: number
  timeElapsed: number
  geoLocation: {
    country: string
    city: string
  }
  device: {
    type: string
    name: string
  }

  fields: AdminPagerSubmissionEntryFieldQueryData[]
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
          city
        }
        device {
          type
          name
        }
        
        fields {
          id
          value
          type
      
          field {
            title
            required
          }
        }
      }
      total    
      limit
      start
    }
  }
`
