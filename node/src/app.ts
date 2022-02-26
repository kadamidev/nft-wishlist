import express, { Request, Response, NextFunction } from "express"
import config from "config"
import routes from "./routes"
import helmet from "helmet"
import connect from "./utils/connect"
import logger from "./utils/logger"
import cors from "cors"

const app = express()
const port = config.get<number>("port")

app.use(cors())
app.options("*", cors()) // include before other routes
app.use(helmet())
app.use(express.json())

routes(app)

app.listen(port, async () => {
  logger.info(`express node server listening on port ${port}`)
  await connect()
})
