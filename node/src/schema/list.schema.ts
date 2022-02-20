import { object, string, TypeOf } from "zod"
export const createListSchema = object({
  body: object({
    password: string()
      .min(4, "Password must be 4 characters or more")
      .optional(),
  }),
})

export type CreateListInput = TypeOf<typeof createListSchema>
