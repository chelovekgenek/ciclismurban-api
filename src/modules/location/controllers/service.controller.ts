import { Controller, Get, HttpStatus, Post, Body, Param, UseGuards, Delete, Patch } from "@nestjs/common"
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
import { LocationExposeGroup, ServicePermissions } from "@ciclismurban/models"

import { getValidateAndTransformPipe as pipe, getResponseOptions as options } from "modules/commons"
import { PermissionsGuard } from "modules/user"

import { ServiceService } from "../services"
import { Service } from "../entities"
import { ServiceByIdPipe } from "../pipes"

@Controller("api/services")
@ApiUseTags("services")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @ApiOperation({ title: "Get service locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Service, isArray: true })
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findAll(): Promise<Service[]> {
    return this.serviceService.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get service locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Service })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Entity not found" })
  @ApiImplicitParam({ name: "id", type: String })
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findById(@Param(ServiceByIdPipe) service: Service): Promise<Service> {
    return service
  }

  @Post()
  @ApiOperation({ title: "Create service location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Service })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiImplicitBody({ name: "Payload", type: Service })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard("jwt"), new PermissionsGuard(ServicePermissions.CREATE))
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async create(
    @Body(
      pipe(
        [LocationExposeGroup.WRITE],
        Service,
      ),
    )
    data: Service,
  ): Promise<Service> {
    return this.serviceService.create(data)
  }

  @Patch("/:id")
  @ApiOperation({ title: "Update service location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: Service })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitParam({ name: "id", type: String })
  @ApiImplicitBody({ name: "Payload", type: Service })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard("jwt"), new PermissionsGuard(ServicePermissions.UPDATE))
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async update(
    @Param(ServiceByIdPipe) service: Service,
    @Body(
      pipe(
        [LocationExposeGroup.UPDATE],
        Service,
      ),
    )
    data: Partial<Service>,
  ): Promise<Service> {
    return this.serviceService.update(service, data)
  }

  @Delete("/:id")
  @ApiOperation({ title: "Delete service location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: Service })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Service not found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitParam({ name: "id", type: String })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard("jwt"), new PermissionsGuard(ServicePermissions.DELETE))
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async deleteById(@Param(ServiceByIdPipe) service: Service): Promise<string> {
    return this.serviceService.delete(service)
  }
}
