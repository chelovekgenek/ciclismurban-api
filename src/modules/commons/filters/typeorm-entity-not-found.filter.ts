import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError"

@Catch(EntityNotFoundError)
export class TypeormEntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = HttpStatus.NOT_FOUND

    response.status(status).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
    })
  }
}
