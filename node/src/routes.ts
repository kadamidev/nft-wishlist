import { Express, Request, Response, NextFunction } from "express"
import { getListHandler } from "./controllers/lists.controller"

function routes(app: Express) {
  app.route("/api/list/:listId").get(getListHandler)
}

export default routes
