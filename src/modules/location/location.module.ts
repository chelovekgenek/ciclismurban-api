import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Parking, Service, Shop } from "./entities"
import { ParkingRepositoryProvider, ServiceRepositoryProvider, ShopRepositoryProvider } from "./repositories"
import { ParkingSubscriber, ServiceSubscriber, ShopSubscriber } from "./subscribers"
import { LocationService } from "./location.service"
import { LocationController } from "./location.controller"

@Module({
  imports: [TypeOrmModule.forFeature([Parking, Service, Shop])],
  providers: [
    ParkingRepositoryProvider,
    ServiceRepositoryProvider,
    ShopRepositoryProvider,
    ParkingSubscriber,
    ServiceSubscriber,
    ShopSubscriber,
    LocationService,
  ],
  controllers: [LocationController],
})
export class LocationModule {}
