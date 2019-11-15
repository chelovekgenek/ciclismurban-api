import { applyDecorators, HttpStatus } from "@nestjs/common"
import { ApiResponse, ApiImplicitBody } from "@nestjs/swagger"
import { ClassType } from "class-transformer/ClassTransformer"

export const ApiBodyValidation = (model: ClassType<any>) =>
  applyDecorators(
    ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" }),
    ApiImplicitBody({ name: "Payload", type: model }),
  )
