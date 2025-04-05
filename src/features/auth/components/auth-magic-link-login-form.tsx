'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { PropsWithChildren } from 'react'
import { useForm, type FieldErrors, useFormContext } from 'react-hook-form'
import { Loader2Icon, SendIcon } from 'lucide-react'
import { MagicLinkFormHandler, magicLinkFormSchema } from '../schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { trpc } from '@/lib/trpc/client'
import { Form, FormField } from '@/components/ui/form'
import formUtils from '@/common/form-utils'
import { useCatchErrorToast } from '@/common/hooks'

export function AuthMagicLinkLoginForm() {
  const {
    formState: { isDirty, isValid, isSubmitSuccessful, isSubmitting },
  } = useFormContext<MagicLinkFormHandler>()

  const isSubmitBtnDisabled = isSubmitting || !isDirty || !isValid || isSubmitSuccessful
  const isSubmitBtnLoading = isSubmitting
  return (
    <div className='grid gap-2'>
      <Label htmlFor='email'>Magic Link</Label>
      <div className='flex gap-2'>
        <FormField
          name='email'
          render={({ field }) => (
            <Input {...field} type='email' placeholder='m@example.com' required />
          )}
        />
        <Button variant='ghost' size={'icon'} disabled={isSubmitBtnDisabled}>
          {isSubmitBtnLoading ? <Loader2Icon className='animate-spin' /> : <SendIcon />}
        </Button>
      </div>
    </div>
  )
}

export function AuthMagicLinkFormProvider(props: PropsWithChildren) {
  const form = useForm<MagicLinkFormHandler>({
    resolver: zodResolver(magicLinkFormSchema),
    defaultValues: formUtils.getDefaults(magicLinkFormSchema),
  })

  const magicLinkMut = trpc.auth.signInWithMagicLink.useMutation()

  const catchErrorToast = useCatchErrorToast()
  const onSubmitSuccess = async (data: MagicLinkFormHandler) => {
    return catchErrorToast(
      async () => {
        await magicLinkMut.mutateAsync(data)
      },
      {
        description: 'Magic link is sent to your email',
      },
    )
  }

  const onSubmitError = (errors: FieldErrors<MagicLinkFormHandler>) => {
    console.log(errors)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitSuccess, onSubmitError)}>{props.children}</form>
    </Form>
  )
}
