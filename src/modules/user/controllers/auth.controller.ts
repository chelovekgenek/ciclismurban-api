import { Controller, HttpStatus, HttpCode, Post, Body } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitBody, ApiImplicitHeader } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"

import { getValidateAndTransformPipe, Token } from "modules/commons"

import { AuthService } from "../services"
import { AuthResponseDto } from "../dto"
import { ExposeGroup } from "../models"
import { User } from "../entities"

@Controller("api/auth")
@ApiUseTags("users")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login/token")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User by exisiting token" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @TransformClassToPlain({ groups: [ExposeGroup.READ] })
  async loginByToken(@Token() token: string): Promise<AuthResponseDto> {
    return this.authService.loginByToken(token)
  }

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User by credentials" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Credentials is not valid" })
  @ApiImplicitBody({ name: "Auth body", type: User })
  @TransformClassToPlain({ groups: [ExposeGroup.READ] })
  async login(
    @Body(getValidateAndTransformPipe([ExposeGroup.LOGIN], User))
    data: User,
  ): Promise<AuthResponseDto> {
    return this.authService.login(data)
  }

  @Post("/register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ title: "Register a new user and get a key (also contact will be created)" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Duplicate key" })
  @ApiImplicitBody({ name: "Auth body", type: User })
  @TransformClassToPlain({ groups: [ExposeGroup.READ] })
  async register(
    @Body(getValidateAndTransformPipe([ExposeGroup.WRITE], User))
    data: User,
  ): Promise<AuthResponseDto> {
    return this.authService.register(data)
  }
}
