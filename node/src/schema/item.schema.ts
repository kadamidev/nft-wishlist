import { object, string, TypeOf } from "zod"

const payload = {
  body: object({
    contract: string({ required_error: "Contract is required" }).length(
      42,
      "Invalid contract"
    ),
    tokenId: string({ required_error: "TokenID is required" }),
  }),
}

export const createItemSchema = object({
  params: object({
    _id: string({
      required_error: "List ID is required",
    }).length(24, "Invalid List ID"),
  }),
  ...payload,
})

export const deleteItemSchema = object({
  params: object({
    _id: string({
      required_error: "List ID is required",
    }).length(24, "Invalid List ID"),
    itemId: string({ required_error: "Item ID is required" }).length(
      24,
      "Invalid Item ID"
    ),
  }),
})

export type CreateItemInput = TypeOf<typeof createItemSchema>
export type DeleteItemInput = TypeOf<typeof deleteItemSchema>
