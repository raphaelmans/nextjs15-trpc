import { AuthRepo } from '@/lib/extern/db/supabase/auth-repo'

export class AuthController {
  private authRepo: AuthRepo
  constructor(authRepo: AuthRepo) {
    this.authRepo = authRepo
  }

  async getCurrentUser(jwt?: string) {
    return this.authRepo.getCurrentUser(jwt)
  }

  async signUp(email: string, password: string, redirectBaseURL: string) {
    await this.authRepo.signUp(email, password, redirectBaseURL)
  }

  async signInWithPassword(email: string, password: string) {
    await this.authRepo.signInWithPassword(email, password)
  }

  async signInWithMagicLink(email: string, redirectBaseURL: string) {
    await this.authRepo.signInWithMagicLink(email, redirectBaseURL)
  }

  async verifyMagicLink(tokenHash: string) {
    await this.authRepo.verifyMagicLink(tokenHash)
  }

  async verifySignUp(tokenHash: string) {
    await this.authRepo.verifySignUp(tokenHash)
  }

  async signOut() {
    await this.authRepo.signOut()
  }

  async sendEmailResetPassword(email: string, redirectBaseURL: string) {
    await this.authRepo.sendEmailResetPassword(email, redirectBaseURL)
  }

  async resetPasswordConfirmation(email: string, password: string) {
    await this.authRepo.resetPasswordConfirmation(email, password)
  }
}
