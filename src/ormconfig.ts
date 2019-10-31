import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { getMetadataArgsStorage } from "typeorm"
import { Config } from "./modules/commons"

const ormconfig: TypeOrmModuleOptions = {
  name: "default",
  type: "mongodb",
  host: Config.get("TYPEORM_HOST"),
  port: Config.getNumber("TYPEORM_PORT"),
  username: Config.get("TYPEORM_USERNAME"),
  password: Config.get("TYPEORM_PASSWORD"),
  database: Config.get("TYPEORM_DATABASE"),
  entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
  subscribers: getMetadataArgsStorage().entitySubscribers.map(tbl => tbl.target),
  synchronize: false,
  logging: "all",
  keepConnectionAlive: true,
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations",
  },
}

export = ormconfig
