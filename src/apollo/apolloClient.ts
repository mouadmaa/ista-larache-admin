import { ApolloClient, ApolloLink, InMemoryCache, Observable } from '@apollo/client'
import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { message } from 'antd'
import jwtDecode from 'jwt-decode'

import { memoryCacheConfig } from './memoryCacheConfig'

let accessToken = ''
export const setAccessToken = (newAccessToken: string) => {
  accessToken = newAccessToken
}

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any
    Promise.resolve(operation)
      .then(operation => {
        if (accessToken) {
          operation.setContext({
            headers: { authorization: `Bearer ${accessToken}` }
          })
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer)
        })
      })
      .catch(observer.error.bind(observer))

    return () => {
      if (handle) handle.unsubscribe()
    }
  })
)

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    if (!accessToken) return true
    try {
      const { exp } = jwtDecode(accessToken)
      if (Date.now() >= exp * 1000) {
        return false
      } else {
        return true
      }
    } catch {
      return false
    }
  },
  fetchAccessToken: () => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/refresh_token`, {
      method: 'POST',
      credentials: 'include'
    })
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken)
  },
  handleError: error => {
    console.warn('Your refresh token is invalid. Try to re login')
    console.error(error)
  }
})

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL,
  credentials: 'include',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message: msg, locations, path }) => {
      if (process.env.NODE_ENV === 'development') message.error(msg, 10)
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, tokenRefreshLink, requestLink, httpLink] as any),
  cache: new InMemoryCache(memoryCacheConfig),
  connectToDevTools: process.env.NODE_ENV === 'development',
})
