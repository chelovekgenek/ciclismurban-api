import { EntitySubscriberInterface, InsertEvent, UpdateEvent, EventSubscriber } from "typeorm"
import uuid from "uuid/v4"

import { Service } from "../entities"

@EventSubscriber()
export class ServiceSubscriber implements EntitySubscriberInterface<Service> {
  listenTo() {
    return Service
  }

  async beforeInsert(event: InsertEvent<Service>) {
    const now = new Date()

    event.entity.uuid = uuid()

    event.entity.createdAt = now
    event.entity.updatedAt = now
  }

  beforeUpdate(event: UpdateEvent<Service>) {
    event.entity.updatedAt = new Date()
  }
}
