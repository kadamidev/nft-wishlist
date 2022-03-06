import { Request, Response, NextFunction } from "express"
import {
  createList,
  deleteList,
  findAndUpdateList,
  findList,
} from "../services/list.service"
import logger from "../utils/logger"
import {
  CreateListInput,
  UpdateListInput,
  GetListInput,
  DeleteListInput,
} from "../schema/list.schema"

export async function createListHandler(
  req: Request<{}, {}, CreateListInput["body"]>,
  res: Response
) {
  try {
    const list = await createList(req.body)

    const cleaned = { ...list }
    delete cleaned.password
    return res.send(cleaned._doc)
  } catch (e: any) {
    logger.error(e)
    return res.status(400).send(e.message)
  }
}

export async function getListHandler(
  req: Request<GetListInput["params"]>,
  res: Response
) {
  const { listId } = req.params
  const list = await findList({ listId: listId })

  if (!list) return res.status(404).send("Invalid list")
  const cleaned = { ...list }
  delete cleaned.password

  res.send(cleaned)
}

export async function deleteListHandler(
  req: Request<DeleteListInput["params"]>,
  res: Response
) {
  const { listId } = req.params

  const list = await deleteList({ listId: listId })

  if (!list) {
    res.status(404).send("Invalid list or update properties")
  }
  return res.send(list)
}

export async function updateListHandler(
  req: Request<UpdateListInput["params"], {}, UpdateListInput["body"]>,
  res: Response
) {
  const { listId } = req.params
  const update = req.body

  const list = await findAndUpdateList({ listId: listId }, update, {
    new: true,
  })

  if (!list) {
    res.status(404).send("Invalid list")
  }

  const cleaned = { ...list }
  delete cleaned.password

  return res.send(cleaned)
}
