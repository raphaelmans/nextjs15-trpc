import React from 'react'
import AuthForgotPasswordForm from '@/features/auth/components/auth-forgot-password-form'

export default function ResetPasswordPage() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm space-y-6'>
        <h1 className='text-center text-2xl font-bold text-gray-800'>Forgot Password</h1>
        <AuthForgotPasswordForm />
      </div>
    </div>
  )
}
