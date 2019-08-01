import { Controller, Get, HttpStatus, Post, Body, Param } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitBody, ApiImplicitParam } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"

import { getValidateAndTransformPipe } from "modules/commons"

import { ParkingRepository } from "../repositories"
import { Parking } from "../entities"
import { ExposeGroup } from "../models"

@Controller("api/parkings")
@ApiUseTags("locations")
export class ParkingController {
  constructor(private readonly parkingRepository: ParkingRepository) {}

  @Get()
  @ApiOperation({ title: "Get parking locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Parking, isArray: true })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async getParkings(): Promise<Parking[]> {
    return this.parkingRepository.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get parking locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Parking })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Entity not found" })
  @ApiImplicitParam({ name: "id", type: String })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async getParking(@Param("id") uuid): Promise<Parking> {
    return this.parkingRepository.findOneOrFail({ uuid })
  }

  @Post()
  @ApiOperation({ title: "Create parking location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Parking })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiImplicitBody({ name: "Payload", type: Parking })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async createParking(
    @Body(getValidateAndTransformPipe([ExposeGroup.WRITE], Parking)) data: Parking,
  ): Promise<Parking> {
    return this.parkingRepository.save(data)
  }
}
