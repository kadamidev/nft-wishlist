import { Express, Request, Response, NextFunction } from "express"
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

function routes(app: Express) {
  app
    .route("/api/list")
    .post(validateResource(createListSchema), createListHandler)

  app
    .route("/api/list/:_id")
    .get(validateResource(getListSchema), getListHandler)
    .delete(validateResource(deleteListSchema), deleteListHandler)
    .put(validateResource(updateListSchema), updateListHandler)
}

export default routes
