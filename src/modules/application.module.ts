import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { LoggerModule, LoggerMiddleware } from "./logger"

@Module({
  imports: [TypeOrmModule.forRoot(), LoggerModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")

    return consumer
  }
}
