import { Connection, EntityRepository, MongoRepository } from "typeorm"

import { RepositoryProvider } from "modules/commons"

import { Parking } from "../entities"

@EntityRepository(Parking)
export class ParkingRepository extends MongoRepository<Parking> {}

export const ParkingRepositoryProvider: RepositoryProvider = Object.freeze({
  provide: ParkingRepository.name,
  useFactory: (connection: Connection) => connection.getCustomRepository(ParkingRepository),
  inject: [Connection],
})
