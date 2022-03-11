import mongoose, { FilterQuery, Types } from "mongoose"
import bcrypt from "bcrypt"
// import config from "config"
import { ItemDocument, itemSchema } from "./item.model"
import { customAlphabet } from "nanoid/non-secure"
import "dotenv/config"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10)
export interface MongoResult {
  _doc: any
}

export interface ListInput {
  password?: string
}

export interface ListDocument
  extends ListInput,
    MongoResult,
    mongoose.Document {
  listId: String
  items: Types.DocumentArray<ItemDocument>
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<Boolean>
}

const listSchema = new mongoose.Schema(
  {
    listId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(),
    },
    password: { type: String },
    items: { type: [itemSchema] },
  },
  {
    timestamps: true,
  }
)

listSchema.pre("save", async function (next) {
  let list: ListDocument = this

  if (!list.password || !list.isModified("password")) {
    return next()
  }

  const swf = parseInt(process.env.SALT_WORK_FACTOR!) || 10
  const salt = await bcrypt.genSalt(swf)
  const hash = await bcrypt.hashSync(list.password, salt)

  list.password = hash

  return next()
})

listSchema.pre(/^(updateOne|findOneAndUpdate)/, async function (next) {
  const list: FilterQuery<ListDocument> = this

  const password: undefined | string = list.getUpdate()?.password || false
  if (password) {
    const swf = parseInt(process.env.SALT_WORK_FACTOR!) || 10
    const salt = await bcrypt.genSalt(swf)
    list._update.password = await bcrypt.hashSync(password, salt)
  }
})

const ListModel = mongoose.model<ListDocument>("List", listSchema)

export default ListModel
