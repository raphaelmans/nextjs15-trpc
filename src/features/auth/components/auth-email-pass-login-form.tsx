'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { PropsWithChildren } from 'react'
import { useForm, type FieldErrors, useFormContext } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { LoginFormHandler, loginFormSchema } from '../schemas'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Form, FormField } from '@/components/ui/form'
import formUtils from '@/common/form-utils'
import { trpc } from '@/lib/trpc/client'
import appRoutes from '@/common/app-routes'
import { useToast } from '@/hooks/use-toast'
import utils from '@/common/utils'

export default function AuthEmailPassLoginForm() {
  const {
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<LoginFormHandler>()

  const isSubmitBtnDisabled = isSubmitting || !isDirty || !isValid
  const isSubmitBtnLoading = isSubmitting

  return (
    <>
      <div className='flex flex-col items-center text-center'>
        <h1 className='font-satisfy text-3xl'>Vuenery</h1>
        <p className='text-balance text-muted-foreground'>
          Explore, Plan, and Share Your Perfect Getaway.
        </p>
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='email'>Email</Label>
        <FormField
          name='email'
          render={({ field }) => (
            <Input {...field} type='email' placeholder='yourname@vuenery.com' required />
          )}
        />
      </div>
      <div className='grid gap-2'>
        <div className='flex items-center'>
          <Label htmlFor='password'>Password</Label>
          <a href='#' className='ml-auto text-sm underline-offset-2 hover:underline'>
            Forgot your password?
          </a>
        </div>
        <FormField
          name='password'
          render={({ field }) => <Input {...field} type='password' required />}
        />
      </div>
      <Button
        type='submit'
        className='w-full'
        disabled={isSubmitBtnDisabled}
        isLoading={isSubmitBtnLoading}
      >
        Start Your Journey
      </Button>
    </>
  )
}

export const AuthEmailPassLoginFormProvider = (
  props: PropsWithChildren<{ className?: string }>,
) => {
  const form = useForm<LoginFormHandler>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: formUtils.getDefaults(loginFormSchema),
  })

  const loginMut = trpc.auth.signIn.useMutation()
  const router = useRouter()

  const { toast } = useToast()
  const onSubmitSuccess = async (data: LoginFormHandler) => {
    try {
      await loginMut.mutateAsync(data)
      router.push(appRoutes.home.base)
    } catch (error) {
      toast({
        description: utils.getClientErrorMessage(error),
        variant: 'destructive',
      })
    }
  }

  const onSubmitError = (errors: FieldErrors<LoginFormHandler>) => {
    console.log(errors)
  }

  return (
    <Form {...form}>
      <form
        className={cn('space-y-5', props.className)}
        onSubmit={form.handleSubmit(onSubmitSuccess, onSubmitError)}
      >
        {props.children}
      </form>
    </Form>
  )
}
