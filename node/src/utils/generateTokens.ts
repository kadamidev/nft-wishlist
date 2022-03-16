import { signJwt } from "./jwt"

export default function generateTokens(session_id: string, list_id: string) {
  const tokenPayload = {
    list_id: list_id,
    session: session_id,
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

  return { accessToken, refreshToken, cookieOptions: options }
}
