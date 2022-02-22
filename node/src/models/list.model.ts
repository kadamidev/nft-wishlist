import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"
export interface ListInput {
  password?: string
}

export interface ListDocument extends ListInput, mongoose.Document {
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

listSchema.pre(/^(updateOne|save|findOneAndUpdate)/, async function (next) {
  const list: any = this
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))

  if (list.password) {
    if (list.isModified("password")) {
      list.password = await bcrypt.hashSync(list.password, salt)
    }
    return next()
  }

  const password = list.getUpdate().password || false
  if (password) {
    list._update.password = await bcrypt.hashSync(password, salt)
  }

  next()
})

listSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const list = this as ListDocument
  if (list.password)
    return bcrypt.compare(candidatePassword, list.password).catch((e) => false)
  return false
}

const ListModel = mongoose.model<ListDocument>("List", listSchema)

export default ListModel
