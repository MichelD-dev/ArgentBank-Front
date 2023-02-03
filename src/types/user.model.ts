import {z} from 'zod'

export const TokenSchema = z.string()

export const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

export type TokenType = z.infer<typeof TokenSchema>

export type UserType = z.infer<typeof UserSchema>
