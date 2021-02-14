import { ApolloQueryResult, useQuery } from '@apollo/client'
import { DocumentNode } from 'graphql'
import { useCallback } from 'react'

export const useImperativeQuery: <TData, TVariables>(
  query: DocumentNode
) => (variables: TVariables) => Promise<ApolloQueryResult<TData>> = (query) => {
  const { refetch } = useQuery(query, { skip: true })

  const cb = useCallback(
    (variables) => {
      return refetch(variables)
    },
    [refetch]
  )

  return cb
}
