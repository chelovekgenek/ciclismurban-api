import { Connection, EntityRepository, MongoRepository } from "typeorm"

import { RepositoryProvider } from "modules/commons"

import { Event } from "../entities"

@EntityRepository(Event)
export class EventRepository extends MongoRepository<Event> {}

export const EventRepositoryProvider: RepositoryProvider = Object.freeze({
  provide: EventRepository.name,
  useFactory: (connection: Connection) => connection.getCustomRepository(EventRepository),
  inject: [Connection],
})
