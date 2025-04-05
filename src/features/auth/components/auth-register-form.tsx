'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { PropsWithChildren } from 'react'
import { useForm, type FieldErrors, useFormContext } from 'react-hook-form'
import { RegisterFormHandler, registerFormSchema } from '../schemas'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Form, FormField } from '@/components/ui/form'
import formUtils from '@/common/form-utils'
import { trpc } from '@/lib/trpc/client'
import { useCatchErrorToast } from '@/common/hooks'

export function AuthRegisterForm() {
  const {
    formState: { isDirty, isValid, isSubmitSuccessful, isSubmitting },
  } = useFormContext<RegisterFormHandler>()

  const isSubmitBtnDisabled = isSubmitting || !isDirty || !isValid || isSubmitSuccessful
  const isSubmitBtnLoading = isSubmitting

  return (
    <>
      <div className='flex flex-col items-center text-center'>
        <h1 className='text-2xl font-bold'>Create an account</h1>
        <p className='text-balance text-muted-foreground'>
          Enter your email below to create your account
        </p>
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='email'>Email</Label>
        <FormField
          name='email'
          render={({ field }) => (
            <Input {...field} type='email' placeholder='m@example.com' required />
          )}
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='password'>Password</Label>
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
        Create account
      </Button>
    </>
  )
}

export const AuthRegisterFormProvider = (props: PropsWithChildren<{ className?: string }>) => {
  const form = useForm<RegisterFormHandler>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: formUtils.getDefaults(registerFormSchema),
  })

  const registerMut = trpc.auth.signUp.useMutation()

  const catchErrorToast = useCatchErrorToast()
  const onSubmitSuccess = async (data: RegisterFormHandler) => {
    return catchErrorToast(
      async () => {
        await registerMut.mutateAsync(data)
      },
      {
        description: 'Account created successfully, check your email for a magic link',
      },
    )
  }

  const onSubmitError = (errors: FieldErrors<RegisterFormHandler>) => {
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
