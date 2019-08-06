import { EntitySubscriberInterface, InsertEvent, UpdateEvent, EventSubscriber as Subscribe } from "typeorm"
import uuid from "uuid/v4"

import { Event } from "../entities"

@Subscribe()
export class EventSubscriber implements EntitySubscriberInterface<Event> {
  listenTo() {
    return Event
  }

  async beforeInsert(event: InsertEvent<Event>) {
    const now = new Date()

    event.entity.uuid = uuid()

    event.entity.createdAt = now
    event.entity.updatedAt = now
  }

  beforeUpdate(event: UpdateEvent<Event>) {
    event.entity.updatedAt = new Date()
  }
}
