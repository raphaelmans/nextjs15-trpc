import { authRouter } from './auth'
import { router } from '@/lib/trpc/init'
import { healthCheckRouter } from '@/lib/adapters/trpc/routers/health-check'

const trpcAdapter = router({
  healthCheck: healthCheckRouter,
  auth: authRouter,
})

export default trpcAdapter
