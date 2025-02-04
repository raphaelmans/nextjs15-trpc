import { NextResponse, type NextRequest } from 'next/server'
import appRoutes from '@/common/app-routes'
import { createClient } from '@/lib/extern/db/supabase/create-client'
import { AuthController } from '@/lib/core/controllers/auth'
import { AuthRepo } from '@/lib/extern/db/supabase/auth-repo'
import { env } from '@/lib/env'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    getAll() {
      return request.cookies.getAll()
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
      supabaseResponse = NextResponse.next({
        request,
      })
      cookiesToSet.forEach(({ name, value, options }) =>
        supabaseResponse.cookies.set(name, value, options),
      )
    },
  })

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  let user: Awaited<ReturnType<typeof AuthController.prototype.getCurrentUser>> = null
  let error: unknown | null = null

  try {
    const auth = new AuthController(new AuthRepo(supabase))
    user = await auth.getCurrentUser()
  } catch (err) {
    error = err
  }

  const requestPathName = request.nextUrl.pathname
  const isSignInPath = requestPathName.startsWith(appRoutes.signIn.base)
  const isIndexPath = requestPathName === appRoutes.index.base
  const matchingRoute = Object.values(appRoutes).find(route =>
    requestPathName === appRoutes.index.base
      ? route.base === appRoutes.index.base
      : route.base.startsWith(requestPathName),
  )

  if (matchingRoute) {
    const url = request.nextUrl.clone()
    if ((error || !user) && matchingRoute.options.type === 'protected') {
      url.pathname = appRoutes.signIn.base
      url.searchParams.set('from', requestPathName)
      return NextResponse.redirect(url)
    }
    if (!error && matchingRoute.options.type === 'guest' && (isSignInPath || isIndexPath)) {
      url.pathname = appRoutes.home.base
      return NextResponse.redirect(url)
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
