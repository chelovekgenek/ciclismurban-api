import { Controller, Get, HttpStatus, Param } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"
import { LocationExposeGroup } from "@ciclismurban/models"

import { getResponseOptions as options, ApiParamId } from "modules/commons"

import { ServiceService } from "../services"
import { Service } from "../entities"
import { ServiceByIdPipe } from "../pipes"

@Controller("api/services")
@ApiUseTags("services")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @ApiOperation({ title: "Get Service locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Service, isArray: true })
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findAll(): Promise<Service[]> {
    return this.serviceService.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get service locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Service })
  @ApiParamId()
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findById(@Param(ServiceByIdPipe) service: Service): Promise<Service> {
    return service
  }
}
