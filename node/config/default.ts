import "dotenv/config"

export default {
  port: process.env.PORT || 3001,
  dbUri: process.env.MONGO_URI,
  saltWorkFactor: 10,
}
