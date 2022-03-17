import { Request, Response } from "express"
import logger from "../utils/logger"
import { CreateItemInput, DeleteItemInput } from "../schema/item.schema"
import { createItem, deleteItem } from "../services/item.service"

export async function createItemHandler(
  req: Request<CreateItemInput["params"], {}, CreateItemInput["body"]>,
  res: Response
) {
  try {
    const { listId } = req.params
    const item = await createItem(
      { listId: listId },
      req.body,
      res.locals.auth?.list_id || null
    )

    if (item === "unauthed") return res.sendStatus(403)

    return res.send(item)
  } catch (e: any) {
    logger.error(e)
    return res.status(400).send(e.message)
  }
}

export async function deleteItemHandler(
  req: Request<DeleteItemInput["params"], {}, {}>,
  res: Response
) {
  try {
    const { listId, itemId } = req.params
    const item = await deleteItem(
      { listId: listId },
      itemId,
      res.locals.auth?.list_id || null
    )
    if (item === "unauthed") return res.sendStatus(403)
    return res.send(item)
  } catch (e: any) {
    logger.error(e)
    return res.status(400).send(e.message)
  }
}
