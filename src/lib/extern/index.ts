import { CookieMethodsServer } from '@supabase/ssr'
import { HealthCheckRepo } from '@/lib/extern/health-check-repo'
import { AuthRepo } from '@/lib/extern/db/supabase/auth-repo'
import { createClient } from '@/lib/extern/db/supabase/create-client'
import { env } from '@/lib/env'

export class MyServiceProvider {
  private cookies: CookieMethodsServer
  private healthCheckRepo?: HealthCheckRepo
  private sbClient?: ReturnType<typeof createClient>
  private authRepo?: AuthRepo
  constructor(cookies: CookieMethodsServer) {
    this.cookies = cookies
  }

  HealthCheckRepo() {
    if (!this.healthCheckRepo) {
      this.healthCheckRepo = new HealthCheckRepo()
    }
    return this.healthCheckRepo
  }

  private sb() {
    if (!this.sbClient) {
      const cl = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, this.cookies)
      this.sbClient = cl
    }
    return this.sbClient!
  }

  AuthRepo() {
    if (!this.authRepo) {
      this.authRepo = new AuthRepo(this.sb())
    }
    return this.authRepo
  }
}
