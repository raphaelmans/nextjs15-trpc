import { z } from 'zod'
import { protectedProcedure, publicProcedure, router } from '@/lib/trpc/init'

export const authRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async opts => {
      const {
        ctx,
        input: { email, password },
      } = opts
      return await ctx.controllers.auth.signUp(email, password, ctx.origin)
    }),
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async opts => {
      const {
        ctx,
        input: { email, password },
      } = opts
      return await ctx.controllers.auth.signInWithPassword(email, password)
    }),
  signInWithMagicLink: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async opts => {
      const {
        ctx,
        input: { email },
      } = opts
      return await ctx.controllers.auth.signInWithMagicLink(email, ctx.origin)
    }),
  verifyMagicLink: publicProcedure
    .input(
      z.object({
        token_hash: z.string(),
      }),
    )
    .query(async ({ ctx, input: { token_hash } }) => {
      return await ctx.controllers.auth.verifyMagicLink(token_hash)
    }),
  verifySignUp: publicProcedure
    .input(
      z.object({
        token_hash: z.string(),
      }),
    )
    .query(async ({ ctx, input: { token_hash } }) => {
      return await ctx.controllers.auth.verifySignUp(token_hash)
    }),
  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.controllers.auth.signOut()
  }),
  getCurrentUser: protectedProcedure
    .input(
      z.object({
        jwt: z.string().jwt().optional(),
      }),
    )
    .query(async opts => {
      const {
        ctx,
        input: { jwt },
      } = opts
      return await ctx.controllers.auth.getCurrentUser(jwt)
    }),
  sendEmailResetPassword: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async opts => {
      const {
        ctx,
        input: { email },
      } = opts
      return await ctx.controllers.auth.sendEmailResetPassword(email, ctx.origin)
    }),
  resetPasswordConfirmation: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async opts => {
      const { ctx, input } = opts
      return await ctx.controllers.auth.resetPasswordConfirmation(input.email, input.password)
    }),
})
