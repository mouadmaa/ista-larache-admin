import { InMemoryCacheConfig } from '@apollo/client'

import { Formation } from '../generated/graphql'

export const memoryCacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        formations: {
          merge: (_existing = [], incoming: Formation[]) => incoming,
        },
      },
    },
  },
}
