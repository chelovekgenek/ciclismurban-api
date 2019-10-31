import { Controller, HttpStatus, HttpCode, Post, Body, UseGuards } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitBody, ApiImplicitHeader } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"

import { getValidateAndTransformPipe as pipe, getResponseOptions as options, Token, GoogleToken } from "modules/commons"

import { AuthService } from "../services"
import { AuthResponseDto } from "../dto"
import { ExposeGroup } from "../models"
import { User } from "../entities"

@Controller("api/auth")
@ApiUseTags("users")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ title: "Register a new user and get a key (also contact will be created)" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Duplicate key" })
  @ApiImplicitBody({ name: "Auth body", type: User })
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async register(
    @Body(
      pipe(
        [ExposeGroup.WRITE],
        User,
      ),
    )
    data: User,
  ): Promise<AuthResponseDto> {
    return this.authService.register(data)
  }

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User by credentials" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Credentials is not valid" })
  @ApiImplicitBody({ name: "Auth body", type: User })
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async login(
    @Body(
      pipe(
        [ExposeGroup.LOGIN],
        User,
      ),
    )
    data: User,
  ): Promise<AuthResponseDto> {
    return this.authService.login(data)
  }

  @Post("/login/token")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User by existing JWT token" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async loginByToken(@Token() token: string): Promise<AuthResponseDto> {
    return this.authService.loginByToken(token)
  }

  @Post("/login/google")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User by Google OAuth token" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "token is wrong" })
  @ApiImplicitHeader({ name: "Authorization-Google", required: true })
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async loginByGoogle(@GoogleToken() token: string): Promise<AuthResponseDto> {
    return this.authService.loginByGoogle(token)
  }
}
