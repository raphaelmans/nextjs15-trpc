import Link from 'next/link'
import {
  AuthRegisterForm,
  AuthRegisterFormProvider,
} from '@/features/auth/components/auth-register-form'
import appRoutes from '@/common/app-routes'

export default function RegisterPage() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm space-y-6'>
        <AuthRegisterFormProvider>
          <AuthRegisterForm />
        </AuthRegisterFormProvider>

        <div className='text-center text-sm'>
          Already have an account?{' '}
          <Link
            href={appRoutes.login.base}
            className='font-medium text-primary-foreground hover:underline'
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  )
}
