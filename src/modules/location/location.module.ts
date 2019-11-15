import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ClientsModule, Transport } from "@nestjs/microservices"

import { Config } from "modules/commons"
import { LoggerModule, LoggerService } from "modules/logger"

import { Event, Parking, Service, Shop } from "./entities"
import {
  EventRepositoryProvider,
  ParkingRepositoryProvider,
  ServiceRepositoryProvider,
  ShopRepositoryProvider,
} from "./repositories"
import { EventSubscriber, ParkingSubscriber, ServiceSubscriber, ShopSubscriber } from "./subscribers"
import {
  EventController,
  ParkingController,
  ServiceController,
  ShopController,
  MeEventController,
  MeParkingController,
  MeServiceController,
  MeShopController,
} from "./controllers"
import { EventService, ParkingService, ServiceService, ShopService } from "./services"
import { MESSAGE_SERVICE } from "./interfaces"

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Parking, Service, Shop]),
    ClientsModule.register([
      {
        name: MESSAGE_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [Config.get("RMQ_URL")],
          queue: Config.get("RMQ_QUEUE"),
        },
      },
    ]),
    LoggerModule,
  ],
  providers: [
    EventRepositoryProvider,
    ParkingRepositoryProvider,
    ServiceRepositoryProvider,
    ShopRepositoryProvider,
    EventSubscriber,
    ParkingSubscriber,
    ServiceSubscriber,
    ShopSubscriber,
    EventService,
    ParkingService,
    ServiceService,
    ShopService,
    LoggerService,
  ],
  controllers: [
    EventController,
    ParkingController,
    ServiceController,
    ShopController,
    MeEventController,
    MeParkingController,
    MeServiceController,
    MeShopController,
  ],
})
export class LocationModule {}
