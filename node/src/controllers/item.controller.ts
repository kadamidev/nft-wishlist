import { Request, Response } from "express"
import logger from "../utils/logger"
import { CreateItemInput, DeleteItemInput } from "../schema/item.schema"
import { createItem, deleteItem } from "../services/item.service"

export async function createItemHandler(
  req: Request<CreateItemInput["params"], {}, CreateItemInput["body"]>,
  res: Response
) {
  try {
    const listId = req.params._id
    const item = await createItem({ _id: listId }, req.body)
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
    const { _id: listId, itemId } = req.params
    const item = await deleteItem({ _id: listId }, itemId)
    return res.send(item)
  } catch (e: any) {
    logger.error(e)
    return res.status(400).send(e.message)
  }
}
