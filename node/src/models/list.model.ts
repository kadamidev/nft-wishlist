import mongoose from "mongoose"

export interface ListDocument extends mongoose.Document {
  code: string
  password?: string
  items?: string[]
  createdAt: Date
  updatedAt: Date
}

const listSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    password: { type: String },
    items: { type: Array },
  },
  {
    timestamps: true,
  }
)

const ListModel = mongoose.model("List", listSchema)

export default ListModel
