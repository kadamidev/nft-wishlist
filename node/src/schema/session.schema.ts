import { object, string, TypeOf } from "zod"

const payload = {
  body: object({
    _id: string({ required_error: "List _id is required" }).length(
      24,
      "Invalid list _id"
    ),
    password: string({ required_error: "Password is required" }),
  }),
}

export const createSessionSchema = object({
  ...payload,
})

export type CreateSessionInput = TypeOf<typeof createSessionSchema>
