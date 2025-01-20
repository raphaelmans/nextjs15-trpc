import { HealthCheckRepo } from '@/lib/extern/health-check-repo'

export class HealthCheckController {
  constructor(private healthCheckRepo: HealthCheckRepo) {}

  async healthCheck() {
    return this.healthCheckRepo.healthCheck()
  }
}
