import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm"
import uuid from "uuid/v4"
import { hash } from "bcrypt"

import { User } from "./entities"
import { Config } from "modules/commons"

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private readonly saltRounds = Number(Config.get("BCRYPT_SALT_ROUNDS"))

  listenTo() {
    return User
  }

  async beforeInsert(event: InsertEvent<User>) {
    const now = new Date()

    event.entity.uuid = uuid()

    event.entity.password = await hash(event.entity.password, this.saltRounds)

    event.entity.createdAt = now
    event.entity.updatedAt = now
  }

  beforeUpdate(event: UpdateEvent<User>) {
    event.entity.updatedAt = new Date()
  }
}