import { Controller, Get, HttpStatus } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"

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

  @Get("/services")
  @ApiOperation({ title: "Get service locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Service, isArray: true })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async getServices(): Promise<Service[]> {
    return this.serviceRepository.find()
  }

  @Get("/shops")
  @ApiOperation({ title: "Get shop locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Shop, isArray: true })
  @TransformClassToPlain({ groups: [ExposeGroup.READ], excludeExtraneousValues: true })
  async getShops(): Promise<Shop[]> {
    return this.shopRepository.find()
  }
}
