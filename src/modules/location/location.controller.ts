import { Controller, Get, HttpStatus, Post, Body } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitBody } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"

import { getValidateAndTransformPipe } from "modules/commons"

import { Parking, Service, Shop } from "./entities"
import { ExposeGroup } from "./models"
import { ParkingRepository, ServiceRepository, ShopRepository } from "./repositories"

@Controller("api/locations")
@ApiUseTags("locations")
export class LocationController {
  constructor(
    private readonly parkingRepository: ParkingRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly shopRepository: ShopRepository,
  ) {}

  @Get("/parkings")
  @ApiOperation({ title: "Get parking locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Parking, isArray: true })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async getParkings(): Promise<Parking[]> {
    return this.parkingRepository.find()
  }

  @Post("/parkings")
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

  @Get("/services")
  @ApiOperation({ title: "Get service locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Service, isArray: true })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async getServices(): Promise<Service[]> {
    return this.serviceRepository.find()
  }

  @Post("/services")
  @ApiOperation({ title: "Create service location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Service })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiImplicitBody({ name: "Payload", type: Service })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async createService(
    @Body(getValidateAndTransformPipe([ExposeGroup.WRITE], Service)) data: Service,
  ): Promise<Service> {
    return this.serviceRepository.save(data)
  }

  @Get("/shops")
  @ApiOperation({ title: "Get shop locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Shop, isArray: true })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async getShops(): Promise<Shop[]> {
    return this.shopRepository.find()
  }

  @Post("/shops")
  @ApiOperation({ title: "Create shop location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Service })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiImplicitBody({ name: "Payload", type: Shop })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async createShop(@Body(getValidateAndTransformPipe([ExposeGroup.WRITE], Shop)) data: Shop): Promise<Shop> {
    return this.shopRepository.save(data)
  }
}
