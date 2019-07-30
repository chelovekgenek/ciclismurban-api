import { Controller, HttpStatus, HttpCode, Post, Body } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitBody } from "@nestjs/swagger"

import { AuthService } from "./auth.service"
import { AuthRequesDto } from "./dto"
import { getValidateAndTransformPipe, Token } from "modules/commons"
import { AuthResponseDto } from "./dto"
import { TransformClassToPlain } from "class-transformer"

@Controller("api/auth")
@ApiUseTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login/token")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User with exisiting token" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @TransformClassToPlain({ groups: ["read"] })
  async loginByToken(@Token() token: string): Promise<AuthResponseDto> {
    return this.authService.loginByToken(token)
  }

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User with exisiting token" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Email/password is not correct" })
  @ApiImplicitBody({ name: "Auth body", type: AuthRequesDto })
  @TransformClassToPlain({ groups: ["read"] })
  async login(
    @Body(getValidateAndTransformPipe(["login"], AuthRequesDto))
    data: AuthRequesDto,
  ): Promise<AuthResponseDto> {
    return this.authService.login(data)
  }

  @Post("/register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ title: "Register a new user and get a key (also contact will be created)" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Duplicate key" })
  @ApiImplicitBody({ name: "Auth body", type: AuthRequesDto })
  @TransformClassToPlain({ groups: ["read"] })
  async register(
    @Body(getValidateAndTransformPipe(["register"], AuthRequesDto))
    data: AuthRequesDto,
  ): Promise<AuthResponseDto> {
    return this.authService.register(data)
  }


  @Post("/reset")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ title: "Generates email for user to reset password" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Duplicate key" })
  @ApiImplicitBody({ name: "Auth body", type: AuthRequesDto })
  async reset(
      @Body(getValidateAndTransformPipe(["reset"], AuthRequesDto))
          data: AuthRequesDto,
  ): Promise<AuthResponseDto> {
    return this.authService.reset(data)
  }


  @Post("/renew")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ title: "Renew password for user" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Duplicate key" })
  @ApiImplicitBody({ name: "Auth body", type: AuthRequesDto })
  async renew(
      @Body(getValidateAndTransformPipe(["renew"], AuthRequesDto))
          data: AuthRequesDto,
  ): Promise<AuthResponseDto> {
    return this.authService.renew(data)
  }
}
