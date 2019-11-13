import { Controller, Get, HttpStatus, Post, Body, Param, UseGuards, Patch, Delete } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import {
  ApiUseTags,
  ApiOperation,
  ApiResponse,
  ApiImplicitBody,
  ApiImplicitParam,
  ApiImplicitHeader,
} from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"
import { LocationExposeGroup, ShopPermissions } from "@ciclismurban/models"

import { getValidateAndTransformPipe as pipe, getResponseOptions as options } from "modules/commons"
import { PermissionsGuard } from "modules/user"

import { Shop } from "../entities"
import { ShopService } from "../services"
import { ShopByIdPipe } from "../pipes"

@Controller("api/shops")
@ApiUseTags("shops")
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  @ApiOperation({ title: "Get shop locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Shop, isArray: true })
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findAll(): Promise<Shop[]> {
    return this.shopService.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get shop locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Shop })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Entity not found" })
  @ApiImplicitParam({ name: "id", type: String })
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findById(@Param(ShopByIdPipe) shop: Shop): Promise<Shop> {
    return shop
  }

  @Post()
  @ApiOperation({ title: "Create shop location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Shop })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiImplicitBody({ name: "Payload", type: Shop })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard("jwt"), new PermissionsGuard(ShopPermissions.CREATE))
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async create(
    @Body(
      pipe(
        [LocationExposeGroup.WRITE],
        Shop,
      ),
    )
    data: Shop,
  ): Promise<Shop> {
    return this.shopService.create(data)
  }

  @Patch("/:id")
  @ApiOperation({ title: "Update shop location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: Shop })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitParam({ name: "id", type: String })
  @ApiImplicitBody({ name: "Payload", type: Shop })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard("jwt"), new PermissionsGuard(ShopPermissions.UPDATE))
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async update(
    @Param(ShopByIdPipe) shop: Shop,
    @Body(
      pipe(
        [LocationExposeGroup.UPDATE],
        Shop,
      ),
    )
    data: Partial<Shop>,
  ): Promise<Shop> {
    return this.shopService.update(shop, data)
  }

  @Delete("/:id")
  @ApiOperation({ title: "Delete shop location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: Shop })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Shop not found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitParam({ name: "id", type: String })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard("jwt"), new PermissionsGuard(ShopPermissions.DELETE))
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async deleteById(@Param(ShopByIdPipe) shop: Shop): Promise<string> {
    return this.shopService.delete(shop)
  }
}
