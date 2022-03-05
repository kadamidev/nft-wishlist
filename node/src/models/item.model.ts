import mongoose, { Types } from "mongoose"
import { MongoResult } from "./list.model"

export interface ItemInput {
  contract: string
  tokenId: string
}

export interface ItemDocument
  extends ItemInput,
    MongoResult,
    Types.Subdocument {
  createdAt: Date
  updatedAt: Date
}

export const itemSchema = new mongoose.Schema(
  {
    contract: { type: String, required: true },
    tokenId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const ItemModel = mongoose.model<ItemDocument>("Item", itemSchema)

export default ItemModel
