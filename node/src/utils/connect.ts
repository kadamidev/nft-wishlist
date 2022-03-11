import mongoose from "mongoose"
// import config from "config"
import logger from "./logger"
import "dotenv/config"

async function connect() {
  // const dbUri = config.get<string>("dbUri")
  const dbUri = process.env.MONGO_URI!

  try {
    await mongoose.connect(dbUri)
    logger.info("connected to db")
  } catch (e) {
    logger.info("failed connecting to db")
    process.exit(1)
  }
}

export default connect
