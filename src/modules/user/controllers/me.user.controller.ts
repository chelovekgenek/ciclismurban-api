import { Controller, HttpStatus, UseGuards, Get, Request } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiOperation, ApiUseTags, ApiResponse, ApiImplicitHeader } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"

import { getResponseOptions as options } from "modules/commons"

import { ExposeGroup } from "../interfaces"
import { User } from "../entities"

@Controller("me")
@ApiUseTags("users")
export class MeUserController {
  @Get()
  @ApiOperation({ title: "Get my User record" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: User })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitHeader({ name: "Authorization", required: true, description: "Bearer token" })
  @UseGuards(AuthGuard("jwt"))
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async findCurrentUser(@Request() req): Promise<User> {
    return req.user
  }
}
