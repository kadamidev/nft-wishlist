import { object, string, TypeOf } from "zod"

const params = {
  params: object({
    _id: string({
      required_error: "List ID is required",
    }).length(24, "Invalid List ID"),
  }),
}

const payload = {
  body: object({
    password: string()
      .min(4, "Password must be 4 characters or more")
      .optional(),
  }),
}

export const createListSchema = object({
  ...payload,
})

export const deleteListSchema = object({
  ...params,
})

export const getListSchema = object({
  ...params,
})

export const updateListSchema = object({
  ...params,
  ...payload,
})

export type CreateListInput = TypeOf<typeof createListSchema>
export type DeleteListInput = TypeOf<typeof deleteListSchema>
export type GetListInput = TypeOf<typeof getListSchema>
export type UpdateListInput = TypeOf<typeof updateListSchema>
