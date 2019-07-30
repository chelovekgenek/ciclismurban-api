import { EntitySubscriberInterface, InsertEvent, UpdateEvent, EventSubscriber } from "typeorm"
import uuid from "uuid/v4"

import { Shop } from "../entities"

@EventSubscriber()
export class ShopSubscriber implements EntitySubscriberInterface<Shop> {
  listenTo() {
    return Shop
  }

  async beforeInsert(event: InsertEvent<Shop>) {
    const now = new Date()

    event.entity.uuid = uuid()

    event.entity.createdAt = now
    event.entity.updatedAt = now
  }

  beforeUpdate(event: UpdateEvent<Shop>) {
    event.entity.updatedAt = new Date()
  }
}
