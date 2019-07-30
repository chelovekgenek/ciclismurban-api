import { Connection, EntityRepository, MongoRepository } from "typeorm"

import { RepositoryProvider } from "modules/commons"
import { User } from "./entities"

@EntityRepository(User)
export class UserRepository extends MongoRepository<User> {}

export const UserRepositoryProvider: RepositoryProvider = Object.freeze({
  provide: UserRepository.name,
  useFactory: (connection: Connection) => connection.getCustomRepository(UserRepository),
  inject: [Connection],
})
