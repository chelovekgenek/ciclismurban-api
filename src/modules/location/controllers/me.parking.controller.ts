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

import { Parking } from "../entities"
import { ParkingService } from "../services"

@Controller("api/me/parkings")
@ApiUseTags("parkings")
export class MeParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  @ApiOperation({ title: "Create Parking location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Parking })
  @ApiAuthPayload()
  @ApiBodyValidation(Parking)
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async create(
    @Request() { user }: AuthenticatedRequest,
    @Body(
      pipe(
        [LocationExposeGroup.WRITE],
        Parking,
      ),
    )
    data: Partial<Parking>,
  ): Promise<Parking> {
    return this.parkingService.create(user, data)
  }

  @Patch("/:id")
  @ApiOperation({ title: "Update Parking location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: Parking })
  @ApiParamId()
  @ApiAuthPayload()
  @ApiBodyValidation(Parking)
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async updateById(
    @Param("id") parkingId: Parking["uuid"],
    @Request() { user }: AuthenticatedRequest,
    @Body(
      pipe(
        [LocationExposeGroup.UPDATE],
        Parking,
      ),
    )
    data: Partial<Parking>,
  ): Promise<Parking> {
    return this.parkingService.update(user.uuid, parkingId, data)
  }

  @Delete("/:id")
  @ApiOperation({ title: "Delete Parking location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: String })
  @ApiParamId()
  @ApiAuthPayload()
  async deleteById(
    @Param("id") parkingId: Parking["uuid"],
    @Request() { user }: AuthenticatedRequest,
  ): Promise<string> {
    return this.parkingService.delete(user.uuid, parkingId)
  }
}
