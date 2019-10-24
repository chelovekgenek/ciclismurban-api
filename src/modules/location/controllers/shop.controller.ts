import { Controller, Get, HttpStatus, Post, Body, Param, UseGuards, Patch, Delete } from "@nestjs/common"
import {
  ApiUseTags,
  ApiOperation,
  ApiResponse,
  ApiImplicitBody,
  ApiImplicitParam,
  ApiImplicitHeader,
} from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"

import { getValidateAndTransformPipe as pipe, getResponseOptions as options } from "modules/commons"
import { AuthGuard } from "modules/user"

import { Shop } from "../entities"
import { ExposeGroup } from "../models"
import { ShopService } from "../services"
import { ShopByIdPipe } from "../pipes"

@Controller("api/shops")
@ApiUseTags("shops")
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  @ApiOperation({ title: "Get shop locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Shop, isArray: true })
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async findAll(): Promise<Shop[]> {
    return this.shopService.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get shop locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Shop })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Entity not found" })
  @ApiImplicitParam({ name: "id", type: String })
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async findById(@Param(ShopByIdPipe) shop: Shop): Promise<Shop> {
    return shop
  }

  @Post()
  @ApiOperation({ title: "Create shop location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Shop })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiImplicitBody({ name: "Payload", type: Shop })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard)
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async create(
    @Body(
      pipe(
        [ExposeGroup.WRITE],
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
  @UseGuards(AuthGuard)
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async update(
    @Param(ShopByIdPipe) shop: Shop,
    @Body(
      pipe(
        [ExposeGroup.UPDATE],
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
  @UseGuards(AuthGuard)
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async deleteById(@Param(ShopByIdPipe) shop: Shop): Promise<string> {
    return this.shopService.delete(shop)
  }
}
