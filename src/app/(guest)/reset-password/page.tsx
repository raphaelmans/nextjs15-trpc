import React from 'react'
import AuthResetPasswordForm from '@/features/auth/components/auth-reset-password-form'

export default function ResetPasswordPage() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm space-y-6'>
        <h1 className='text-center text-2xl font-bold text-gray-800'>Reset Password</h1>
        <AuthResetPasswordForm />
      </div>
    </div>
  )
}
