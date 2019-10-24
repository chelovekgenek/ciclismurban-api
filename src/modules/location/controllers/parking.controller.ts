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

import { Parking } from "../entities"
import { ExposeGroup } from "../models"
import { ParkingByIdPipe } from "../pipes"
import { ParkingService } from "../services"

@Controller("api/parkings")
@ApiUseTags("parkings")
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get()
  @ApiOperation({ title: "Get parking locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Parking, isArray: true })
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async findAll(): Promise<Parking[]> {
    return this.parkingService.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get parking locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Parking })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Entity not found" })
  @ApiImplicitParam({ name: "id", type: String })
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async findById(@Param(ParkingByIdPipe) parking: Parking): Promise<Parking> {
    return parking
  }

  @Post()
  @ApiOperation({ title: "Create parking location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Parking })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiImplicitBody({ name: "Payload", type: Parking })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard)
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async create(
    @Body(
      pipe(
        [ExposeGroup.WRITE],
        Parking,
      ),
    )
    data: Parking,
  ): Promise<Parking> {
    return this.parkingService.create(data)
  }

  @Patch("/:id")
  @ApiOperation({ title: "Update parking location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: Parking })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitParam({ name: "id", type: String })
  @ApiImplicitBody({ name: "Payload", type: Parking })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard)
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async update(
    @Param(ParkingByIdPipe) parking: Parking,
    @Body(
      pipe(
        [ExposeGroup.UPDATE],
        Parking,
      ),
    )
    data: Partial<Parking>,
  ): Promise<Parking> {
    return this.parkingService.update(parking, data)
  }

  @Delete("/:id")
  @ApiOperation({ title: "Delete parking location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: Parking })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Parking not found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitParam({ name: "id", type: String })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard)
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async deleteById(@Param(ParkingByIdPipe) parking: Parking): Promise<string> {
    return this.parkingService.delete(parking)
  }
}
