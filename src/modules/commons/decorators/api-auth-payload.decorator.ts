import { applyDecorators, UseGuards, HttpStatus } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiImplicitHeader, ApiResponse } from "@nestjs/swagger"

export const ApiAuthPayload = () =>
  applyDecorators(
    ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" }),
    ApiImplicitHeader({ name: "Authorization", required: true }),
    UseGuards(AuthGuard("jwt")),
  )
