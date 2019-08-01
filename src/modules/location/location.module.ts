import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Parking, Service, Shop } from "./entities"
import { ParkingRepositoryProvider, ServiceRepositoryProvider, ShopRepositoryProvider } from "./repositories"
import { ParkingSubscriber, ServiceSubscriber, ShopSubscriber } from "./subscribers"
import { LocationService } from "./location.service"
import { ParkingController, ServiceController, ShopController } from "./controllers"

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
  controllers: [ParkingController, ServiceController, ShopController],
})
export class LocationModule {}
