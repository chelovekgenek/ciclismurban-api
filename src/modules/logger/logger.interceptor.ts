import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestMethod } from "@nestjs/common"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"

import { LoggerService } from "./logger.service"

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    return next.handle().pipe(
      tap(() => {
        const req: Request = ctx.switchToHttp().getRequest()
        this.logger.log(`[${req.method}] ${req.url} ...${Date.now() - now}ms`)
      }),
    )
  }
}
