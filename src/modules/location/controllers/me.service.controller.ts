import { Controller, Get, HttpStatus, Post, Body, Param, Delete, Patch, Request } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from "@nestjs/swagger"
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

import { Service } from "../entities"
import { ServiceService } from "../services"

@Controller("api/me/services")
@ApiUseTags("services")
export class MeServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({ title: "Create Service location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Service })
  @ApiAuthPayload()
  @ApiBodyValidation(Service)
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async create(
    @Request() { user }: AuthenticatedRequest,
    @Body(
      pipe(
        [LocationExposeGroup.WRITE],
        Service,
      ),
    )
    data: Partial<Service>,
  ): Promise<Service> {
    return this.serviceService.create(user, data)
  }

  @Patch("/:id")
  @ApiOperation({ title: "Update Service location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: Service })
  @ApiParamId()
  @ApiAuthPayload()
  @ApiBodyValidation(Service)
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async updateById(
    @Param("id") serviceId: Service["uuid"],
    @Request() { user }: AuthenticatedRequest,
    @Body(
      pipe(
        [LocationExposeGroup.UPDATE],
        Service,
      ),
    )
    data: Partial<Service>,
  ): Promise<Service> {
    return this.serviceService.update(user.uuid, serviceId, data)
  }

  @Delete("/:id")
  @ApiOperation({ title: "Delete Service location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: String })
  @ApiParamId()
  @ApiAuthPayload()
  async deleteById(
    @Param("id") serviceId: Service["uuid"],
    @Request() { user }: AuthenticatedRequest,
  ): Promise<string> {
    return this.serviceService.delete(user.uuid, serviceId)
  }
}
