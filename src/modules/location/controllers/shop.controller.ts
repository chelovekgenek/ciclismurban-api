import { Controller, Get, HttpStatus, Post, Body, Param } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitBody, ApiImplicitParam } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"

import { getValidateAndTransformPipe } from "modules/commons"

import { ShopRepository } from "../repositories"
import { Shop } from "../entities"
import { ExposeGroup } from "../models"

@Controller("api/shops")
@ApiUseTags("locations")
export class ShopController {
  constructor(private readonly shopRepository: ShopRepository) {}

  @Get()
  @ApiOperation({ title: "Get shop locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Shop, isArray: true })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async getShops(): Promise<Shop[]> {
    return this.shopRepository.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get parking locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Shop })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Entity not found" })
  @ApiImplicitParam({ name: "id", type: String })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async getParking(@Param("id") uuid): Promise<Shop> {
    return this.shopRepository.findOneOrFail({ uuid })
  }

  @Post()
  @ApiOperation({ title: "Create shop location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Shop })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiImplicitBody({ name: "Payload", type: Shop })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async createShop(@Body(getValidateAndTransformPipe([ExposeGroup.WRITE], Shop)) data: Shop): Promise<Shop> {
    return this.shopRepository.save(data)
  }
}