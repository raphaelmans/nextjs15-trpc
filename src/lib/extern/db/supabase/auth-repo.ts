import { createClient } from '@/lib/extern/db/supabase/create-client'
import { User } from '@/lib/extern/db/schemas'

export class AuthRepo {
  private client: ReturnType<typeof createClient>
  constructor(client: ReturnType<typeof createClient>) {
    this.client = client
  }

  async getCurrentUser(jwt?: string) {
    const {
      data: { user },
      error,
    } = await this.client.auth.getUser(jwt)
    if (error) {
      throw error
    }
    return user as User | null
  }

  async signUp(email: string, password: string, redirectBaseURL: string) {
    const { error } = await this.client.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectBaseURL,
      },
    })
    if (error) {
      throw error
    }
  }

  async signInWithPassword(email: string, password: string) {
    const { error } = await this.client.auth.signInWithPassword({ email, password })
    if (error) {
      throw error
    }
  }

  async signInWithMagicLink(email: string, redirectBaseURL: string) {
    const { error } = await this.client.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: redirectBaseURL,
      },
    })
    if (error) {
      throw error
    }
  }

  async verifyMagicLink(tokenHash: string) {
    const { error } = await this.client.auth.verifyOtp({ token_hash: tokenHash, type: 'magiclink' })
    if (error) {
      throw error
    }
  }

  async verifySignUp(tokenHash: string) {
    const { error } = await this.client.auth.verifyOtp({ token_hash: tokenHash, type: 'signup' })
    if (error) {
      throw error
    }
  }

  async signOut() {
    const { error } = await this.client.auth.signOut()
    if (error) {
      throw error
    }
  }

  async sendEmailResetPassword(email: string, redirectBaseURL: string) {
    const { error } = await this.client.auth.resetPasswordForEmail(email, {
      redirectTo: redirectBaseURL,
    })
    if (error) {
      throw error
    }
  }

  async resetPasswordConfirmation(email: string, password: string) {
    const { error } = await this.client.auth.updateUser({
      email,
      password,
    })
    if (error) {
      throw error
    }
  }
}
