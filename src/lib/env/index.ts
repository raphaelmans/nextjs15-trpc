import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
    DEV_PORT: z.string(),
  },
  client: {},
  experimental__runtimeEnv: {},
})
