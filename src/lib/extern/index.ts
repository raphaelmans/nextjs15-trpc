import { HealthCheckRepo } from '@/lib/extern/health-check-repo'

export class MyServiceProvider {
  private healthCheckRepo: HealthCheckRepo
  constructor() {
    this.healthCheckRepo = new HealthCheckRepo()
  }

  HealthCheckRepo() {
    return this.healthCheckRepo
  }
}
