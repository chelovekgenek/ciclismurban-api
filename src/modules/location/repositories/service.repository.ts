import { Connection, EntityRepository, MongoRepository } from "typeorm"

import { RepositoryProvider } from "modules/commons"

import { Service } from "../entities"

@EntityRepository(Service)
export class ServiceRepository extends MongoRepository<Service> {}

export const ServiceRepositoryProvider: RepositoryProvider = Object.freeze({
  provide: ServiceRepository.name,
  useFactory: (connection: Connection) => connection.getCustomRepository(ServiceRepository),
  inject: [Connection],
})
