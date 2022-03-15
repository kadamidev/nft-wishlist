import { Request, Response } from "express"
import { validatePassword } from "../services/list.service"
import {
  createSession,
  findSessions,
  updateSession,
} from "../services/session.service"
import { signJwt } from "../utils/jwt"

export async function createListSessionHandler(req: Request, res: Response) {
  const list = await validatePassword({ _id: req.body._id }, req.body.password)

  if (!list) {
    return res.status(401).send("Invalid password")
  }

  const session = await createSession(list._id)

  const tokenPayload = {
    list_id: list._id,
    session: session._id,
  }

  const accessToken = signJwt(tokenPayload, {
    expiresIn: process.env.ACCESS_TOKEN_TTL, //30m
  })

  const refreshToken = signJwt(tokenPayload, {
    expiresIn: process.env.REFRESH_TOKEN_TTL, //1y
  })

  let options = {
    path: "/",
    sameSite: true,
    httpOnly: true,
  }

  res.cookie("x-access-token", accessToken, options)
  res.cookie("x-refresh-token", refreshToken, options)

  return res.status(200).send({ message: "success" })
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.auth.session

  await updateSession({ _id: sessionId }, { valid: false })

  res.cookie("x-access-token", null)
  res.cookie("x-refresh-token", null)
  res.sendStatus(200)
}
