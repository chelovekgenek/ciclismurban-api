import { Controller, HttpStatus, HttpCode, Post, Body, UseGuards, Request } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitBody, ApiImplicitHeader } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"
import { UserExposeGroup } from "@ciclismurban/models"

import { getValidateAndTransformPipe as pipe, getResponseOptions as options } from "modules/commons"
import { User } from "modules/user"

import { AuthResponseDto } from "../dto"
import { AuthService } from "../services"
import { ExposeGroup } from "../interfaces"

@Controller("api/auth")
@ApiUseTags("auth")
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
        [UserExposeGroup.WRITE],
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
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async login(@Request() req): Promise<AuthResponseDto> {
    return this.authService.pack(req.user)
  }

  @Post("/login/token")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User by existing JWT token as Bearer token" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitHeader({ name: "Authorization", required: true, description: "Bearer token" })
  @UseGuards(AuthGuard("jwt"))
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async loginByToken(@Request() req): Promise<AuthResponseDto> {
    return this.authService.pack(req.user)
  }

  @Post("/login/google")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User by Google OAuth token as Bearer token" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "token is wrong" })
  @ApiImplicitHeader({ name: "Authorization", required: true, description: "Bearer token" })
  @UseGuards(AuthGuard("google"))
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async loginByGoogle(@Request() req): Promise<AuthResponseDto> {
    return this.authService.pack(req.user)
  }

  @Post("/login/facebook")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Login User by Facebook OAuth token as Bearer token" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "token is wrong" })
  @ApiImplicitHeader({ name: "Authorization", required: true, description: "Bearer token" })
  @UseGuards(AuthGuard("facebook"))
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async loginByFacebook(@Request() req): Promise<AuthResponseDto> {
    return this.authService.pack(req.user)
  }
}
