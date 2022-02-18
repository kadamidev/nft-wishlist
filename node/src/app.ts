import express, { Request, Response, NextFunction } from "express"
import routes from "./routes"
import helmet from "helmet"

const app = express()
const port = 3001

app.use(helmet())
app.use(express.json())

routes(app)

app.listen(port, () => {
  console.log(`express node server listening on port ${port}`)
})
