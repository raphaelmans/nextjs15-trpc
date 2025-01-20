import { initTRPC } from '@trpc/server'
import { cache } from 'react'
import superjson from 'superjson'
import { MyServiceProvider } from '@/lib/extern'
import { MyControllerFactory } from '@/lib/core/controllers'

export const createTRPCContext = cache(async () => {
  const services = new MyServiceProvider()
  const controllers = new MyControllerFactory(services)
  return {
    controllers: {
      healthCheck: controllers.HealthCheck(),
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
