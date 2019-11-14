import { Controller, HttpStatus, UseGuards, Get, Request, Patch, Body } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiOperation, ApiUseTags, ApiResponse, ApiImplicitHeader, ApiImplicitBody } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"
import { UserExposeGroup } from "@ciclismurban/models"

import { getResponseOptions as options, getValidateAndTransformPipe as pipe } from "modules/commons"

import { User, Profile } from "../entities"
import { MutatedRequest } from "../interfaces"
import { UserService } from "../services"

@Controller("api/me")
@ApiUseTags("users")
export class MeUserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @ApiOperation({ title: "Get my User record" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: User })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitHeader({ name: "Authorization", required: true, description: "Bearer token" })
  @UseGuards(AuthGuard("jwt"))
  @TransformClassToPlain(options([UserExposeGroup.READ]))
  async findMe(@Request() { user }: MutatedRequest): Promise<User> {
    return user
  }

  @Patch("/profile")
  @ApiOperation({ title: "Update my User profile record" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: User })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitHeader({ name: "Authorization", required: true, description: "Bearer token" })
  @ApiImplicitBody({ name: "Payload", type: Profile })
  @UseGuards(AuthGuard("jwt"))
  @TransformClassToPlain(options([UserExposeGroup.READ]))
  async updateMeProfile(
    @Request() { user }: MutatedRequest,
    @Body(
      pipe(
        [UserExposeGroup.UPDATE],
        Profile,
      ),
    )
    profile: Partial<Profile>,
  ): Promise<User> {
    return this.userService.updateProfile(user, profile)
  }
}
