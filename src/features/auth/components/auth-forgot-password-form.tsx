'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { ForgotPasswordFormHandler, forgotPasswordFormSchema } from '../schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { trpc } from '@/lib/trpc/client'
import appRoutes from '@/common/app-routes'
import { useToast } from '@/hooks/use-toast'
import utils from '@/common/utils'

export default function AuthForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormHandler>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const {
    formState: { isSubmitting, isDirty, isValid },
  } = form

  const buttonDisabled = !isDirty || !isValid || isSubmitting
  const resetPasswordMut = trpc.auth.sendEmailResetPassword.useMutation()

  const { toast } = useToast()

  const onSubmit = async (data: ForgotPasswordFormHandler) => {
    try {
      await resetPasswordMut.mutateAsync({
        email: data.email,
      })
      toast({
        title: 'Reset link sent',
        description: 'Please check your email for the reset link',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: utils.getClientErrorMessage(error),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={buttonDisabled} isLoading={isSubmitting}>
          Send Reset Link
        </Button>

        {resetPasswordMut.isError && (
          <p className='text-center text-red-500'>{resetPasswordMut.error.message}</p>
        )}

        <p className='mt-4 text-center text-gray-600'>
          Remember your password?{' '}
          <Link href={appRoutes.login.base} className='hover:underline'>
            Login here
          </Link>
        </p>
      </form>
    </Form>
  )
}
