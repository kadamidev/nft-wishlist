import { FilterQuery, UpdateQuery } from "mongoose"
import SessionModel, { SessionDocument } from "../models/session.model"
import { verifyJwt } from "../utils/jwt"
import { findList } from "./list.service"
import { signJwt } from "../utils/jwt"

export async function createSession(listId: string) {
  const session = await SessionModel.create({ list: listId })

  return session.toJSON()
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return await SessionModel.find(query).lean()
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update)
}

export async function updateSessions(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateMany(query, update)
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string
}) {
  const { decoded } = verifyJwt(refreshToken)

  if (!decoded || !decoded.hasOwnProperty("session")) return false

  const session = await SessionModel.findById(decoded["session"])

  if (!session || !session.valid) return false

  const list = await findList({ _id: decoded["list_id"] })

  if (!list) return false

  const tokenPayload = {
    list_id: list._id,
    session: session._id,
  }
  const accessToken = signJwt(tokenPayload, {
    expiresIn: process.env.ACCESS_TOKEN_TTL, //30m
  })

  return accessToken
}
