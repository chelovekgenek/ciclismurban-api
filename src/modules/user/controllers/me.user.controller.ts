import { Controller, HttpStatus, Get, Request, Patch, Body, Post, Put } from "@nestjs/common"
import { ApiOperation, ApiUseTags, ApiResponse } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"
import { UserExposeGroup } from "@ciclismurban/models"

import {
  getResponseOptions as options,
  getValidateAndTransformPipe as pipe,
  ApiAuthPayload,
  AuthenticatedRequest,
  ApiBodyValidation,
} from "modules/commons"

import { User, Profile } from "../entities"
import { UserService } from "../services"
import { Point } from "modules/commons/entities"

@Controller("api/me")
@ApiUseTags("users")
export class MeUserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @ApiOperation({ title: "Get my User record" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: User })
  @ApiAuthPayload()
  @TransformClassToPlain(options([UserExposeGroup.READ]))
  async findMe(@Request() { user }: AuthenticatedRequest): Promise<User> {
    return user
  }

  @Patch("/profile")
  @ApiOperation({ title: "Update my User profile record" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: User })
  @ApiAuthPayload()
  @ApiBodyValidation(Profile)
  @TransformClassToPlain(options([UserExposeGroup.READ]))
  async updateMeProfile(
    @Request() { user }: AuthenticatedRequest,
    @Body(pipe([UserExposeGroup.UPDATE], Profile)) profile: Partial<Profile>,
  ): Promise<User> {
    return this.userService.updateProfile(user, profile)
  }

  @Put("/position")
  @ApiOperation({ title: "Create or update my User position record" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: User })
  @ApiAuthPayload()
  @ApiBodyValidation(Point)
  @TransformClassToPlain(options([UserExposeGroup.READ]))
  async updateMePosition(
    @Request() { user }: AuthenticatedRequest,
    @Body(pipe([UserExposeGroup.UPDATE], Point)) position: Point,
  ): Promise<User> {
    return this.userService.updatePosition(user, position)
  }
}
