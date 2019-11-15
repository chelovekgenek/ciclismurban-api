import { applyDecorators, HttpStatus } from "@nestjs/common"
import { ApiResponse, ApiImplicitParam } from "@nestjs/swagger"

export const ApiParamId = () =>
  applyDecorators(
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Entity not found" }),
    ApiImplicitParam({ name: "id", type: String }),
  )
