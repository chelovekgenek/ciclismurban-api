import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { getMetadataArgsStorage } from "typeorm"
import { Config } from "./commons"

export const ormconfig: TypeOrmModuleOptions = {
  name: "default",
  type: "mongodb",
  host: Config.get("TYPEORM_HOST"),
  port: Config.getNumber("TYPEORM_PORT"),
  username: Config.get("TYPEORM_USERNAME"),
  password: Config.get("TYPEORM_PASSWORD"),
  database: Config.get("TYPEORM_DATABASE"),
  entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
  subscribers: getMetadataArgsStorage().entitySubscribers.map(tbl => tbl.target),
  synchronize: Config.getBoolean("TYPEORM_SYNCHRONIZE"),
  logging: "all",
  keepConnectionAlive: true,
}
