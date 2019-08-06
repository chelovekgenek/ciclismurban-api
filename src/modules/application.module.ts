import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { LoggerMiddleware, LoggerModule } from "./logger"
import { LocationModule } from "./location"
import { UserModule } from "./user"
import { FileModule } from "./file"

@Module({
  imports: [TypeOrmModule.forRoot(), LoggerModule, LocationModule, UserModule, FileModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")

    return consumer
  }
}
