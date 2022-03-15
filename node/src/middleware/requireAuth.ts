import { Request, Response, NextFunction } from "express"

export default function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = res.locals.auth

  if (!auth) return res.sendStatus(403)
  next()
}
