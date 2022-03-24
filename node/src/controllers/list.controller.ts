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
import { createSession, updateSessions } from "../services/session.service"
import generateTokens from "../utils/generateTokens"

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
  const lockedFlag = list.password ? true : false
  const authedFlag = res.locals.auth?.list_id === list._id.toString()

  return res.send({ ...list, password: lockedFlag, authed: authedFlag })
}

export async function deleteListHandler(
  req: Request<DeleteListInput["params"]>,
  res: Response
) {
  const listId = res.locals.auth.list_id

  const list = await deleteList({ _id: listId })

  if (!list) {
    return res.status(404).send("Invalid list")
  }
  return res.status(200).send({ message: "successfully deleted" })
}

export async function updateListHandler( //change pw
  req: Request<UpdateListInput["params"], {}, UpdateListInput["body"]>,
  res: Response
) {
  const { listId } = req.params

  const list = await findList({ listId: listId })

  if (!list) {
    return res.status(404).send("Invalid list")
  }
  if (
    list.password !== null &&
    list._id.toString() !== res.locals.auth?.list_id
  ) {
    return res.sendStatus(403)
  }

  const updatedList = await findAndUpdateList(
    { listId: listId },
    { password: req.body.password },
    {
      new: true,
    }
  )

  if (!updatedList) {
    return res.status(404).send("failed to update")
  }

  if (req.body.password) {
    const session = await createSession(updatedList._id)
    const { accessToken, refreshToken, cookieOptions } = generateTokens(
      session._id,
      updatedList._id
    )
    res.cookie("x-access-token", accessToken, cookieOptions)
    res.cookie("x-refresh-token", refreshToken, cookieOptions)
  } else {
    updateSessions({ list: updatedList._id }, { valid: false })
    res.cookie("x-access-token", null)
    res.cookie("x-refresh-token", null)
  }

  const cleaned = { ...updatedList }
  delete cleaned.password

  return res.send(cleaned)
}
