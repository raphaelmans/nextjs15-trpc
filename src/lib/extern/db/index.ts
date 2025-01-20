import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/lib/env'

const client = postgres(env.DATABASE_URL)
const db = drizzle({ client, casing: 'snake_case' })

export default db
