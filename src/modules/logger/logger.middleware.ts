import { Injectable, NestMiddleware } from "@nestjs/common"
import { Request } from "express"

import { LoggerService } from "./logger.service"

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}
  use(req: Request, res: Response, next: () => void) {
    this.logger.log(`${req.method} ${req.baseUrl} ${JSON.stringify(req.query)}`)
    next()
  }
}
