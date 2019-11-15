import { Controller, Get, HttpStatus, Post, Body, Param, Delete, Patch, Request } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"
import { LocationExposeGroup } from "@ciclismurban/models"

import {
  getValidateAndTransformPipe as pipe,
  getResponseOptions as options,
  ApiAuthPayload,
  ApiBodyValidation,
  AuthenticatedRequest,
  ApiParamId,
} from "modules/commons"

import { Shop } from "../entities"
import { ShopService } from "../services"

@Controller("api/me/shops")
@ApiUseTags("shops")
export class MeShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @ApiOperation({ title: "Create Shop location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Shop })
  @ApiAuthPayload()
  @ApiBodyValidation(Shop)
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async create(
    @Request() { user }: AuthenticatedRequest,
    @Body(
      pipe(
        [LocationExposeGroup.WRITE],
        Shop,
      ),
    )
    data: Partial<Shop>,
  ): Promise<Shop> {
    return this.shopService.create(user, data)
  }

  @Patch("/:id")
  @ApiOperation({ title: "Update Shop location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: Shop })
  @ApiParamId()
  @ApiAuthPayload()
  @ApiBodyValidation(Shop)
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async updateById(
    @Param("id") shopId: Shop["uuid"],
    @Request() { user }: AuthenticatedRequest,
    @Body(
      pipe(
        [LocationExposeGroup.UPDATE],
        Shop,
      ),
    )
    data: Partial<Shop>,
  ): Promise<Shop> {
    return this.shopService.update(user.uuid, shopId, data)
  }

  @Delete("/:id")
  @ApiOperation({ title: "Delete Shop location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: String })
  @ApiParamId()
  @ApiAuthPayload()
  async deleteById(@Param("id") shopId: Shop["uuid"], @Request() { user }: AuthenticatedRequest): Promise<string> {
    return this.shopService.delete(user.uuid, shopId)
  }
}
