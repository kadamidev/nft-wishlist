import { Request, Response, NextFunction } from "express"

export function getListHandler(
  req: Request<{ listId: string }>,
  res: Response,
  next: NextFunction
) {
  const { listId } = req.params
  console.log(listId)
  res.send(listId)
}
