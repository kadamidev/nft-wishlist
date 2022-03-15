import mongoose, { Types } from "mongoose"
import { ListDocument, MongoResult } from "./list.model"

export interface SessionDocument extends mongoose.Document, MongoResult {
  list: ListDocument["_id"]
  valid: boolean
  createdAt: Date
  updatedAt: Date
}

export const sessionSchema = new mongoose.Schema(
  {
    list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
    valid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema)

export default SessionModel
