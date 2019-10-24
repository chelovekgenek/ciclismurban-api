import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ClientsModule, Transport } from "@nestjs/microservices"

import { UserModule } from "modules/user"
import { Config } from "modules/commons"
import { LoggerModule, LoggerService } from "modules/logger"

import { Parking, Service, Shop } from "./entities"
import {
  EventRepositoryProvider,
  ParkingRepositoryProvider,
  ServiceRepositoryProvider,
  ShopRepositoryProvider,
} from "./repositories"
import { EventSubscriber, ParkingSubscriber, ServiceSubscriber, ShopSubscriber } from "./subscribers"
import { EventController, ParkingController, ServiceController, ShopController } from "./controllers"
import { EventService, ParkingService, ServiceService } from "./services"
import { MESSAGE_SERVICE } from "./interfaces"

@Module({
  imports: [
    TypeOrmModule.forFeature([Parking, Service, Shop]),
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
    UserModule,
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
    LoggerService,
  ],
  controllers: [EventController, ParkingController, ServiceController, ShopController],
})
export class LocationModule {}
