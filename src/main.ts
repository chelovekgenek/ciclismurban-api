import { NestFactory } from "@nestjs/core"
import { INestApplication } from "@nestjs/common"
import chalk from "chalk"
import "module-alias/register"

import { LoggerService } from "modules/logger"
import { ApplicationModule } from "./modules/application.module"
import { Config, TypeormEntityNotFoundFilter } from "./modules/commons"
import { appBootstrap } from "./app"

async function bootstrap() {
  const logger: LoggerService = new LoggerService()

  const app: INestApplication = await NestFactory.create(ApplicationModule, {
    logger,
  })

  app.enableCors()
  app.useGlobalFilters(new TypeormEntityNotFoundFilter())

  await appBootstrap(app, logger)

  const port = Config.getNumber("PORT", 3000)
  await app.listen(port, () => {
    if (Config.get("NODE_ENV") !== "production") {
      const divider = chalk.gray("----------------------------------- ")
      logger.log(divider)
      logger.log(`Service started ==> 🌎`)
      logger.log(`Localhost: \t${chalk.magenta(`http://localhost:${port}`)}`)

      if (Config.get("SWAGGER_ENABLED")) {
        logger.log(`Swagger: \t${chalk.green(`http://localhost:${port}${Config.get("SWAGGER_PATH")}`)} `)
      }
      logger.log(divider)
    }
  })
}

bootstrap()
