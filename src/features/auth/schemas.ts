import { z } from 'zod'

const passwordSchema = z.string().trim().min(8).default('')
const emailSchema = z.string().trim().email().default('')

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type LoginFormHandler = z.infer<typeof loginFormSchema>

export const magicLinkFormSchema = z.object({
  email: emailSchema,
})

export type MagicLinkFormHandler = z.infer<typeof magicLinkFormSchema>

export const registerFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type RegisterFormHandler = z.infer<typeof registerFormSchema>
