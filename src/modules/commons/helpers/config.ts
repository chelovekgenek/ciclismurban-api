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
  public static get = (name: string, defaultValue = ""): string => process.env[name] || String(defaultValue)
  public static getNumber = (name: string, defaultValue = 0): number => Number(process.env[name] || defaultValue)
  public static getBoolean = (name: string, defaultValue = true): boolean => Boolean(process.env[name] || defaultValue)
}
