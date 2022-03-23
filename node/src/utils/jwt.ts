import jwt from "jsonwebtoken"

const privKey = process.env.JWT_PRIV!
const pubKey = process.env.JWT_PUB!

export function signJwt(
  payload: Object,
  options?: jwt.SignOptions | undefined
) {
  console.log(pubKey)
  return jwt.sign(payload, privKey, {
    ...(options && options),
    algorithm: "RS256",
  })
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, pubKey)
    return {
      valid: true,
      expired: false,
      decoded: decoded,
    }
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    }
  }
}
