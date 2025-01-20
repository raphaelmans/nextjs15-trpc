import { publicProcedure, router } from '@/lib/trpc/init'

export const healthCheckRouter = router({
  status: publicProcedure.query(opts => {
    const { ctx } = opts
    const res = ctx.controllers.healthCheck.healthCheck()
    return res
  }),
})
