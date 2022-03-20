import { Request, Response, NextFunction } from "express"
import { reIssueAccessToken } from "../services/session.service"
import { verifyJwt } from "../utils/jwt"
export default async function deserializeToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.cookies["x-access-token"] || null
  const refreshToken = req.cookies["x-refresh-token"] || null

  if (!accessToken) return next()

  const { decoded, expired } = verifyJwt(accessToken)

  if (decoded) {
    res.locals.auth = decoded
    return next()
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken })

    if (newAccessToken) {
      res.cookie("x-access-token", newAccessToken, {
        path: "/",
        sameSite: true,
        httpOnly: true,
      })

      res.cookie("x-cs-access-token", newAccessToken, {
        path: "/",
        sameSite: true,
        httpOnly: false,
      })

      const { decoded } = verifyJwt(newAccessToken)

      res.locals.auth = decoded
      return next()
    }
  }

  return next()
}
