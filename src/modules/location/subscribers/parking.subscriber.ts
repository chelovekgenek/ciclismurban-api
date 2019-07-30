import { EntitySubscriberInterface, InsertEvent, UpdateEvent, EventSubscriber } from "typeorm"
import uuid from "uuid/v4"

import { Parking } from "../entities"

@EventSubscriber()
export class ParkingSubscriber implements EntitySubscriberInterface<Parking> {
  listenTo() {
    return Parking
  }

  async beforeInsert(event: InsertEvent<Parking>) {
    const now = new Date()

    event.entity.uuid = uuid()

    event.entity.createdAt = now
    event.entity.updatedAt = now
  }

  beforeUpdate(event: UpdateEvent<Parking>) {
    event.entity.updatedAt = new Date()
  }
}
