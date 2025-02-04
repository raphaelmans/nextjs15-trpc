import { MyServiceProvider } from '@/lib/extern'
import { HealthCheckController } from '@/lib/core/controllers/health-check'
import { AuthController } from '@/lib/core/controllers/auth'

export class MyControllerFactory {
  services: MyServiceProvider
  constructor(services: MyServiceProvider) {
    this.services = services
  }

  HealthCheck() {
    return new HealthCheckController(this.services.HealthCheckRepo())
  }

  Auth() {
    return new AuthController(this.services.AuthRepo())
  }
}
