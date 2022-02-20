import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"

export interface ListInput {
  password?: string
}

export interface ListDocument extends ListInput, mongoose.Document {
  code: string
  items?: string[]
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<Boolean>
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

listSchema.pre("save", async function (next) {
  let list = this as ListDocument

  if (!list.password || !list.isModified("password")) {
    return next()
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))

  const hash = await bcrypt.hashSync(list.password, salt)

  list.password = hash

  return next()
})

listSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const list = this as ListDocument
  if (list.password)
    return bcrypt.compare(candidatePassword, list.password).catch((e) => false)
  return false
}

const ListModel = mongoose.model("List", listSchema)

export default ListModel
