import { Controller, Get, HttpStatus, Param } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"
import { LocationExposeGroup } from "@ciclismurban/models"

import { getResponseOptions as options, ApiParamId } from "modules/commons"

import { Parking } from "../entities"
import { ParkingByIdPipe } from "../pipes"
import { ParkingService } from "../services"

@Controller("api/parkings")
@ApiUseTags("parkings")
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get()
  @ApiOperation({ title: "Get Parking locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Parking, isArray: true })
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findAll(): Promise<Parking[]> {
    return this.parkingService.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get Parking locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Parking })
  @ApiParamId()
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findById(@Param(ParkingByIdPipe) parking: Parking): Promise<Parking> {
    return parking
  }
}
