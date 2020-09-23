import { InMemoryCacheConfig } from '@apollo/client'

import { Formation } from '../generated/graphql'

export const memoryCacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        formations: {
          merge: (existing = [], incoming: Formation[]) => [...incoming, ...existing],
        },
      },
    },
  },
}
