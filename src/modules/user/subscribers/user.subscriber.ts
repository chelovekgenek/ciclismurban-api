import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm"
import uuid from "uuid/v4"
import { hash } from "bcrypt"

import { Config } from "modules/commons"

import { User } from "../entities"

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private readonly saltRounds = Number(Config.get("BCRYPT_SALT_ROUNDS"))

  listenTo() {
    return User
  }

  async beforeInsert(event: InsertEvent<User>) {
    const now = new Date()

    event.entity.uuid = uuid()

    if (event.entity.password) {
      event.entity.password = await hash(event.entity.password, this.saltRounds)
    }
    event.entity.permissions = []
    event.entity.createdAt = now
    event.entity.updatedAt = now
  }

  beforeUpdate(event: UpdateEvent<User>) {
    event.entity.updatedAt = new Date()
  }
}
