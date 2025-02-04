import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { authUsers } from 'drizzle-orm/supabase'

export const profile = pgTable('profile', {
  id: text('id').primaryKey(),
  userId: uuid('user_id').references(() => authUsers.id),
  firstName: text('first_name').notNull().default(''),
  lastName: text('last_name').notNull().default(''),
  email: text('email').notNull().default(''),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
})

export type User = typeof authUsers.$inferSelect
