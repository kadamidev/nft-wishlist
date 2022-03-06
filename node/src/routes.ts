import { Express, Request, Response, NextFunction } from "express"
import {
  createItemHandler,
  deleteItemHandler,
} from "./controllers/item.controller"
import {
  getListHandler,
  createListHandler,
  deleteListHandler,
  updateListHandler,
} from "./controllers/list.controller"
import validateResource from "./middleware/validateResource"
import {
  createListSchema,
  deleteListSchema,
  getListSchema,
  updateListSchema,
} from "./schema/list.schema"
import { createItemSchema, deleteItemSchema } from "./schema/item.schema"

function routes(app: Express) {
  app
    .route("/api/list")
    .post(validateResource(createListSchema), createListHandler)

  app
    .route("/api/list/:listId")
    .get(validateResource(getListSchema), getListHandler)
    .delete(validateResource(deleteListSchema), deleteListHandler)
    .put(validateResource(updateListSchema), updateListHandler)

  app
    .route("/api/list/:listId/item")
    .post(validateResource(createItemSchema), createItemHandler)

  app
    .route("/api/list/:listId/item/:itemId")
    .delete(validateResource(deleteItemSchema), deleteItemHandler)
}

export default routes
