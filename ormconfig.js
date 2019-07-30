const fs = require("fs")
const dotenv = require("dotenv")
const dotenvSafe = require("dotenv-safe")

if (fs.existsSync(".env")) {
  dotenv.config()
  dotenvSafe.config({
    allowEmptyValues: true,
  })
}

module.exports = [
  {
    name: "default",
    type: "mongodb",
    logging: "all",
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [process.env.TYPEORM_ENTITIES],
    subscribers: [process.env.TYPEORM_SUBSCRIBERS],
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    logging: process.env.TYPEORM_LOGGING,
  },
]
