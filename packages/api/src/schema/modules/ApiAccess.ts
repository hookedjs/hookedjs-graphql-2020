import {extendType, objectType} from '@nexus/schema'

import {rules} from '../lib'
import prismaHelpers from '../lib/prismaHelpers'

const ApiAccess: ObjectModule = {
  ObjectType: objectType({
    name: 'ApiAccess',
    definition(t) {
      prismaHelpers.includeFields(t)
    },
  }),
  Queries: extendType({
    type: 'Query',
    definition(t) {
      prismaHelpers.includeQueries(t)
    },
  }),
  Mutations: extendType({
    type: 'Mutation',
    definition(t) {
      prismaHelpers.includeMutations(t)
    },
  }),
  Rules: {
    Query: {},
    Mutation: {},
    ApiAccess: rules.isAdmin,
  }
}
export default ApiAccess