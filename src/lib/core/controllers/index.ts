import { MyServiceProvider } from '@/lib/extern'
import { HealthCheckController } from '@/lib/core/controllers/health-check'

export class MyControllerFactory {
  services: MyServiceProvider
  constructor(services: MyServiceProvider) {
    this.services = services
  }

  HealthCheck() {
    return new HealthCheckController(this.services.HealthCheckRepo())
  }
}
