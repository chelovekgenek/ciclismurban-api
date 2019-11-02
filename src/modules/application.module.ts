import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { LoggerModule } from "./logger"
import { LocationModule } from "./location"
import { UserModule } from "./user"
import { AuthModule } from "./auth"
import { FileModule } from "./file"
import ormconfig from "../ormconfig"

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), LoggerModule, LocationModule, UserModule, AuthModule, FileModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    return consumer
  }
}
