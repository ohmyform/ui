import {gql} from 'apollo-boost'

export interface AdminPagerFormEntryQueryData {
  id: string
  created: string
  lastModified?: string
  title: string
  isLive: boolean
  language: string
  admin: {
    id: string
    email: string
    username: string
  }
}

export interface AdminPagerFormQueryData {
  pager: {
    entries: AdminPagerFormEntryQueryData[]

    total: number
    limit: number
    start: number
  }
}

export interface AdminPagerFormQueryVariables {
  start?: number
  limit?: number
}

export const ADMIN_PAGER_FORM_QUERY = gql`
  query pager($start: Int, $limit: Int){
    pager: listForms(start: $start, limit: $limit) {
      entries {
        id
        created
        lastModified
        title
        isLive
        language
        admin {
          id
          email
          username
        }
      }
      total    
      limit
      start
    }
  }
`
