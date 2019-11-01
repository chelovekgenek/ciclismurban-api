import { Controller, HttpStatus, HttpCode, Post, Body, UseGuards, Request } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitBody, ApiImplicitHeader } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"

import { getValidateAndTransformPipe as pipe, getResponseOptions as options } from "modules/commons"

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
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Credentials are not valid" })
  @ApiImplicitBody({ name: "Auth body", type: User })
  @UseGuards(AuthGuard("local"))
  async login(@Request() req): Promise<AuthResponseDto> {
    return req.user
  }

  @Post("/login/token")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User by existing JWT token as Bearer token" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitHeader({ name: "Authorization", required: true, description: "Bearer token" })
  @UseGuards(AuthGuard("jwt"))
  async loginByToken(@Request() req): Promise<AuthResponseDto> {
    return req.user
  }

  @Post("/login/google")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User by Google OAuth token as Bearer token" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "token is wrong" })
  @ApiImplicitHeader({ name: "Authorization", required: true, description: "Bearer token" })
  @UseGuards(AuthGuard("google"))
  async loginByGoogle(@Request() req): Promise<null> {
    return req.user
  }

  @Post("/login/facebook")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User by Facebook OAuth token as Bearer token" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "token is wrong" })
  @ApiImplicitHeader({ name: "Authorization", required: true, description: "Bearer token" })
  @UseGuards(AuthGuard("facebook"))
  async loginByFacebook(@Request() req): Promise<null> {
    return req.user
  }
}
