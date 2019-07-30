import * as fs from "fs"
import * as dotenv from "dotenv"
import * as dotenvSafe from "dotenv-safe"

if (fs.existsSync(".env")) {
  dotenv.config()
  dotenvSafe.config({
    allowEmptyValues: true,
  })
}

export class Config {
  public static get = (name: string, defaultValue?: string | number): string =>
    process.env[name] || String(defaultValue)
}
