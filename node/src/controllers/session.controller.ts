import { Request, Response } from "express"
import { validatePassword } from "../services/list.service"
import {
  createSession,
  findSessions,
  updateSession,
} from "../services/session.service"
import generateTokens from "../utils/generateTokens"

export async function createListSessionHandler(req: Request, res: Response) {
  const list = await validatePassword({ _id: req.body._id }, req.body.password)

  if (!list) {
    return res.status(401).send("Invalid password")
  }

  const session = await createSession(list._id)

  const { accessToken, refreshToken, cookieOptions } = generateTokens(
    session._id,
    list._id
  )

  res.cookie("x-access-token", accessToken, cookieOptions)
  res.cookie("x-refresh-token", refreshToken, cookieOptions)

  return res.status(200).send({ message: "success" })
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.auth.session

  await updateSession({ _id: sessionId }, { valid: false })

  res.cookie("x-access-token", null)
  res.cookie("x-refresh-token", null)
  return res.sendStatus(200)
}
