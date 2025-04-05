import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import AuthEmailPassLoginForm, {
  AuthEmailPassLoginFormProvider,
} from '@/features/auth/components/auth-email-pass-login-form'
import {
  AuthMagicLinkFormProvider,
  AuthMagicLinkLoginForm,
} from '@/features/auth/components/auth-magic-link-login-form'
import appRoutes from '@/common/app-routes'
export default function AuthLoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <section className='p-6 md:p-8'>
            <div className='flex flex-col gap-6'>
              <AuthEmailPassLoginFormProvider>
                <AuthEmailPassLoginForm />
              </AuthEmailPassLoginFormProvider>
              <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
              <AuthMagicLinkFormProvider>
                <AuthMagicLinkLoginForm />
              </AuthMagicLinkFormProvider>
              <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link
                  href={appRoutes.register.base}
                  className='font-medium text-primary-foreground hover:underline'
                >
                  Sign up
                </Link>
              </div>
            </div>
          </section>
          <div className='relative hidden bg-muted md:block'>
            {/* <Image
              src={shareFoodImageSrc}
              alt='Image'
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
              fill
            /> */}
          </div>
        </CardContent>
      </Card>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
        By clicking continue, you agree to our <Link href='#'>Terms of Service</Link> and{' '}
        <Link href='#'>Privacy Policy</Link>.
      </div>
    </div>
  )
}
