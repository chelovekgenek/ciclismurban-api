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
import { LocationExposeGroup, ParkingPermissions } from "@ciclismurban/models"

import { getValidateAndTransformPipe as pipe, getResponseOptions as options } from "modules/commons"
import { PermissionsGuard } from "modules/user"

import { Parking } from "../entities"
import { ParkingByIdPipe } from "../pipes"
import { ParkingService } from "../services"
import { AuthGuard } from "@nestjs/passport"

@Controller("api/parkings")
@ApiUseTags("parkings")
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get()
  @ApiOperation({ title: "Get parking locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Parking, isArray: true })
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findAll(): Promise<Parking[]> {
    return this.parkingService.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get parking locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Parking })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Entity not found" })
  @ApiImplicitParam({ name: "id", type: String })
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findById(@Param(ParkingByIdPipe) parking: Parking): Promise<Parking> {
    return parking
  }

  @Post()
  @ApiOperation({ title: "Create parking location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Parking })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiImplicitBody({ name: "Payload", type: Parking })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard("jwt"), new PermissionsGuard(ParkingPermissions.CREATE))
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async create(
    @Body(
      pipe(
        [LocationExposeGroup.WRITE],
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
  @UseGuards(AuthGuard("jwt"), new PermissionsGuard(ParkingPermissions.UPDATE))
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async update(
    @Param(ParkingByIdPipe) parking: Parking,
    @Body(
      pipe(
        [LocationExposeGroup.UPDATE],
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
  @UseGuards(AuthGuard("jwt"), new PermissionsGuard(ParkingPermissions.DELETE))
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async deleteById(@Param(ParkingByIdPipe) parking: Parking): Promise<string> {
    return this.parkingService.delete(parking)
  }
}
