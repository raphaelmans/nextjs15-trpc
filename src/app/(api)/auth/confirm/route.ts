import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import appRoutes from '@/common/app-routes'
import { trpc } from '@/lib/trpc/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = appRoutes.index.base
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  switch (type) {
    case 'magiclink':
      if (token_hash) {
        try {
          await trpc.auth.verifyMagicLink({ token_hash })
        } catch (error) {
          console.error(error)
        }
      }
      break
    case 'signup':
      if (token_hash) {
        try {
          await trpc.auth.verifySignUp({ token_hash })
        } catch (error) {
          console.error(error)
        }
      }
      break
  }

  return NextResponse.redirect(redirectTo)
}
