import mongoose from "mongoose"
import config from "config"

async function connect() {
  const dbUri = config.get<string>("dbUri")

  try {
    await mongoose.connect(dbUri)
    console.log("connected to db")
  } catch (e) {
    console.error("failed connecting to db")
    process.exit(1)
  }
}

export default connect
