import { CookieMethodsServer, createServerClient } from '@supabase/ssr'
import { Database } from '@/lib/extern/db/supabase/database.types'

export function createClient(url: string, key: string, cookies: CookieMethodsServer) {
  const payload = JSON.parse(atob(key.split('.')[1]))
  const global =
    payload.role === 'service_role'
      ? {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        }
      : undefined
  return createServerClient<Database>(url, key, { cookies, global })
}
