import express, { Request, Response, NextFunction } from "express"
// import config from "config"
import routes from "./routes"
import helmet from "helmet"
import connect from "./utils/connect"
import logger from "./utils/logger"
import path from "path"
// import cors from "cors"
import "dotenv/config"

const app = express()
// const port = config.get<number>("port")
const port = process.env.PORT || 3001

// app.use(cors())
// app.options("*", cors()) // include before other routes

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'", "api.opensea.io"],
      "script-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["*"],
    },
  })
)

app.use(express.json())

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend")))
}

routes(app)

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"))
})

app.listen(port, async () => {
  logger.info(`express node server listening on port ${port}`)
  await connect()
})
