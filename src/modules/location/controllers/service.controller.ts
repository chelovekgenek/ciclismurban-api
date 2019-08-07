import { Controller, Get, HttpStatus, Post, Body, Param, UseGuards } from "@nestjs/common"
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

import { ServiceRepository } from "../repositories"
import { Service } from "../entities"
import { ExposeGroup } from "../models"

@Controller("api/services")
@ApiUseTags("locations")
export class ServiceController {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  @Get()
  @ApiOperation({ title: "Get service locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Service, isArray: true })
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async getServices(): Promise<Service[]> {
    return this.serviceRepository.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get parking locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Service })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Entity not found" })
  @ApiImplicitParam({ name: "id", type: String })
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async getParking(@Param("id") uuid): Promise<Service> {
    return this.serviceRepository.findOneOrFail({ uuid })
  }

  @Post()
  @ApiOperation({ title: "Create service location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Service })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiImplicitBody({ name: "Payload", type: Service })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard)
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async createService(
    @Body(
      pipe(
        [ExposeGroup.WRITE],
        Service,
      ),
    )
    data: Service,
  ): Promise<Service> {
    return this.serviceRepository.save(data)
  }
}
