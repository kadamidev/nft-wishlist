import express, { Request, Response, NextFunction } from "express"
import routes from "./routes"
import helmet from "helmet"
import connect from "./utils/connect"
import logger from "./utils/logger"
import path from "path"
import "dotenv/config"
import cookieParser from "cookie-parser"
import deserializeToken from "./middleware/deserializeToken"

const app = express()
const port = process.env.PORT || 3001

app.use(helmet())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'", "api.opensea.io"],
      "script-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["*"],
    },
  })
)

app.use(cookieParser())
app.use(express.json())
app.use(deserializeToken)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend")))
}
app.use(express.static(path.join(__dirname, "frontend")))

routes(app)

if (process.env.NODE_ENV === "production") {
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"))
  })
}

app.listen(port, async () => {
  logger.info(`express node server listening on port ${port}`)
  await connect()
})
