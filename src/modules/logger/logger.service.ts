import { Injectable, LoggerService as NestLoggerService } from "@nestjs/common"
import { Logger, format, createLogger, transports } from "winston"
import chalk from "chalk"

import { Config } from "../commons/helpers"

const logger: Logger = createLogger({
  level: Config.get("LOG_LEVEL", "debug"),
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(info => `${chalk.yellow(info.timestamp)} ${chalk.blue(info.level)}: ${info.message}`),
  ),
  transports: [
    new (transports.Console as any)({
      level: "debug",
      colorize: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      datePattern: ".yyyy-MM-dd",
      timestamp: true,
    }),
  ],
})

@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: string): void {
    logger.debug(this.build(message))
  }
  info(message: string) {
    logger.info(this.build(message))
  }
  error(message: string, trace?: string) {
    logger.error(this.build(message, trace))
  }
  warn(message: string) {
    logger.warn(this.build(message))
  }

  build(message, trace?) {
    return message
  }
}
