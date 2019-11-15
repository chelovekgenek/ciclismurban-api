import { Controller, Get, HttpStatus, Param } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"
import { LocationExposeGroup } from "@ciclismurban/models"

import { getResponseOptions as options, ApiParamId } from "modules/commons"

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
  @ApiParamId()
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findById(@Param(ShopByIdPipe) shop: Shop): Promise<Shop> {
    return shop
  }
}
