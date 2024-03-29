import {rule} from 'graphql-shield'
export * from 'graphql-shield'


export const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return !!ctx.user.id
  },
)

export function isAdminCtx(ctx: any) {
  return ctx.user.roles.includes('admin')
}

export const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user.roles.includes('admin')
  },
)

export const isEditor = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user.roles.includes('editor') || ctx.user.roles.includes('admin')
  },
)

export function mergeRuleSets(...ruleSets: RuleSet[]): RuleSet {
  return ruleSets.reduce(
    (a,r) => ({
      ...a,
      ...r,
      Query: {...a.Query, ...r.Query},
      Mutation: {...a.Mutation, ...r.Mutation },
    }),
    {Query:{}, Mutation: {}})
}

export interface RuleSet {
  Query: Record<string, any>,
  Mutation: Record<string, any>,
  [ObjectName: string]: any,
}