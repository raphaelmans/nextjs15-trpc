'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useEffect } from 'react'
import { Terminal } from 'lucide-react'
import router from 'next/router'
import { ResetPasswordFormHandler, resetPasswordFormSchema } from '../schemas'
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
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import utils from '@/common/utils'

function AuthResetPasswordFormSkeleton() {
  return (
    <div className='w-full space-y-6'>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-16' />
        <Skeleton className='h-10 w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-10 w-full' />
      </div>
      <Skeleton className='h-10 w-full' />
      <Skeleton className='mx-auto h-4 w-3/4' />
    </div>
  )
}

export default function AuthResetPasswordForm() {
  const form = useForm<ResetPasswordFormHandler>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    formState: { isSubmitting, isDirty, isValid },
    reset,
  } = form

  const userQuery = trpc.auth.getCurrentUser.useQuery({})

  useEffect(() => {
    if (userQuery.isSuccess && userQuery.data?.email) {
      reset({
        email: userQuery.data.email,
      })
    }
  }, [userQuery.data?.email, userQuery.isSuccess, reset])

  const buttonDisabled = !isDirty || !isValid || isSubmitting
  const resetPasswordConfirmMut = trpc.auth.resetPasswordConfirmation.useMutation()
  const { toast } = useToast()

  const onSubmit = async (data: ResetPasswordFormHandler) => {
    try {
      await resetPasswordConfirmMut.mutateAsync({
        email: data.email,
        password: data.password,
      })
      toast({
        title: 'Password reset successful',
        description: 'You can now log in.',
      })
      router.push(appRoutes.login.base)
    } catch (error) {
      toast({
        title: 'Error',
        description: utils.getClientErrorMessage(error),
      })
    }
  }

  if (userQuery.isPending) {
    return <AuthResetPasswordFormSkeleton />
  }

  if (userQuery.isError) {
    return (
      <Alert variant='destructive'>
        <Terminal className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load user data. Please try refreshing the page.
          {/* Optionally display userQuery.error.message */}
        </AlertDescription>
      </Alert>
    )
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
                {/* Consider making email readonly if pre-filled */}
                <Input placeholder='Enter your email' disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Enter your new password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={buttonDisabled} isLoading={isSubmitting}>
          Reset Password
        </Button>

        {resetPasswordConfirmMut.isError && (
          <p className='text-center text-sm text-destructive'>
            {/* Display a generic message or specific error if needed */}
            An error occurred. Please try again.
          </p>
        )}

        <p className='mt-4 text-center text-sm text-muted-foreground'>
          Remembered your password?{' '}
          <Link href={appRoutes.login.base} className='font-medium hover:underline'>
            Sign in here
          </Link>
        </p>
      </form>
    </Form>
  )
}
