import { initTRPC, TRPCError } from '@trpc/server'
import { cache } from 'react'
import superjson from 'superjson'
import { cookies, headers } from 'next/headers'
import { MyServiceProvider } from '@/lib/extern'
import { MyControllerFactory } from '@/lib/core/controllers'
import { env } from '@/lib/env'

export const createTRPCContext = cache(async () => {
  const header = await headers()
  const cookieStore = await cookies()
  const services = new MyServiceProvider({
    getAll() {
      return cookieStore.getAll()
    },
    setAll(cookiesToSet) {
      try {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
      } catch {
        // The `setAll` method was called from a Server Component.
        // This can be ignored if you have middleware refreshing
        // user sessions.
      }
    },
  })
  const controllers = new MyControllerFactory(services)
  const auth = controllers.Auth()
  async function getUser() {
    try {
      return await auth.getCurrentUser()
    } catch {
      return null
    }
  }
  return {
    user: await getUser(),
    origin: header.get('origin') ?? `http://localhost:${env.DEV_PORT}`,
    controllers: {
      healthCheck: controllers.HealthCheck(),
      auth: auth,
    },
  }
})
export type Context = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const router = t.router
export const createCallerFactory = t.createCallerFactory
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(opts => {
  if (!opts.ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return opts.next({
    ctx: {
      user: opts.ctx.user,
    },
  })
})
