import { Connection, EntityRepository, MongoRepository } from "typeorm"

import { RepositoryProvider } from "modules/commons"

import { Shop } from "../entities"

@EntityRepository(Shop)
export class ShopRepository extends MongoRepository<Shop> {}

export const ShopRepositoryProvider: RepositoryProvider = Object.freeze({
  provide: ShopRepository.name,
  useFactory: (connection: Connection) => connection.getCustomRepository(ShopRepository),
  inject: [Connection],
})
