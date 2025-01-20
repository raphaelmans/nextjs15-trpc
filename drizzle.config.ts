import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/lib/extern/drizzle',
  schema: './src/lib/extern/db/schemas.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
