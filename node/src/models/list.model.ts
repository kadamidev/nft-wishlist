import mongoose, { FilterQuery } from "mongoose"
import bcrypt from "bcrypt"
import config from "config"
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
  items?: string[]
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<Boolean>
}

const listSchema = new mongoose.Schema(
  {
    password: { type: String },
    items: { type: Array },
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

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
  const hash = await bcrypt.hashSync(list.password, salt)

  list.password = hash

  return next()
})

listSchema.pre(/^(updateOne|findOneAndUpdate)/, async function (next) {
  const list: FilterQuery<ListDocument> = this

  const password: undefined | string = list.getUpdate()?.password || false
  if (password) {
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
    list._update.password = await bcrypt.hashSync(password, salt)
  }
})

const ListModel = mongoose.model<ListDocument>("List", listSchema)

export default ListModel

// listSchema.pre(/^(updateOne|save|findOneAndUpdate)/, async function (next) {
//   const list: FilterQuery<ListDocument>  | ListDocument = this
//   const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))

//   if (list.password) {
//     if (list.isModified("password")) {
//       list.password = await bcrypt.hashSync(list.password, salt)
//     }
//     return next()
//   }

//   const password = list.getUpdate().password || false
//   if (password) {
//     list._update.password = await bcrypt.hashSync(password, salt)
//   }

//   next()
// })
