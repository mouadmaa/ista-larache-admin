import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { message as Message } from 'antd'

import { memoryCacheConfig } from './memoryCacheConfig'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  credentials: 'include',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      Message.error(message, process.env.NODE_ENV === 'development' ? 10 : 5)
    })
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink as any, httpLink]),
  cache: new InMemoryCache(memoryCacheConfig),
  connectToDevTools: process.env.NODE_ENV === 'development',
})
