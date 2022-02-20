import { Express, Request, Response, NextFunction } from "express"
import {
  getListHandler,
  createListHandler,
} from "./controllers/list.controller"
import validateResource from "./middleware/validateResource"
import { createListSchema } from "./schema/list.schema"

function routes(app: Express) {
  app
    .route("/api/list")
    .post(validateResource(createListSchema), createListHandler)

  app.route("/api/list/:listId").get(getListHandler)
}

export default routes
