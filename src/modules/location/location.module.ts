import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Parking, Service, Shop } from "./entities"
import {
  EventRepositoryProvider,
  ParkingRepositoryProvider,
  ServiceRepositoryProvider,
  ShopRepositoryProvider,
} from "./repositories"
import { EventSubscriber, ParkingSubscriber, ServiceSubscriber, ShopSubscriber } from "./subscribers"
import { EventController, ParkingController, ServiceController, ShopController } from "./controllers"

@Module({
  imports: [TypeOrmModule.forFeature([Parking, Service, Shop])],
  providers: [
    EventRepositoryProvider,
    ParkingRepositoryProvider,
    ServiceRepositoryProvider,
    ShopRepositoryProvider,
    EventSubscriber,
    ParkingSubscriber,
    ServiceSubscriber,
    ShopSubscriber,
  ],
  controllers: [EventController, ParkingController, ServiceController, ShopController],
})
export class LocationModule {}
