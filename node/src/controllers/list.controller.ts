import { Request, Response, NextFunction } from "express"
import { createList } from "../services/list.service"
import crypto from "crypto"
import logger from "../utils/logger"
import { CreateListInput } from "../schema/list.schema"

export async function createListHandler(
  req: Request<{}, {}, CreateListInput["body"] & { code?: string }>,
  res: Response
) {
  try {
    const code = crypto.randomBytes(10).toString("hex")
    req.body.code = code
    const list = await createList(req.body)
    console.log(list)

    return res.send(list)
  } catch (e: any) {
    logger.error(e)
    return res.status(400).send(e.message)
  }
}

export function getListHandler(
  req: Request<{ listId: string }>,
  res: Response,
  next: NextFunction
) {
  const { listId } = req.params
  console.log(listId)
  res.send(listId)
}
