import { Injectable, OnModuleInit, Inject } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { classToPlain } from "class-transformer"
import { LocationExposeGroup } from "@ciclismurban/models"

import { getResponseOptions as options } from "modules/commons"
import { LoggerService } from "modules/logger"
import { User } from "modules/user"

import { EventRepository } from "../repositories"
import { Event } from "../entities"
import { EventTypes, MESSAGE_SERVICE } from "../interfaces"

@Injectable()
export class EventService implements OnModuleInit {
  constructor(
    @Inject(MESSAGE_SERVICE) private readonly client: ClientProxy,
    private readonly eventRepository: EventRepository,
    private readonly logger: LoggerService,
  ) {}

  async onModuleInit() {
    try {
      await this.client.connect()
    } catch (e) {
      this.logger.error("Can't connect to messenger service", e)
    }
  }

  async find(): Promise<Event[]> {
    return this.eventRepository.find()
  }

  async findById(uuid: Event["uuid"]): Promise<Event> {
    return this.eventRepository.findOneOrFail({ uuid })
  }

  async findByIds(userId: Event["userId"], uuid: Event["uuid"]): Promise<Event> {
    return this.eventRepository.findOneOrFail({ uuid, userId })
  }

  async create(user: User, data: Partial<Event>): Promise<Event> {
    const event = this.eventRepository.create({ userId: user.uuid, ...data })
    const record = await this.eventRepository.save(event)
    process.nextTick(() => {
      this.client.emit(EventTypes.CREATED, classToPlain(record, options([LocationExposeGroup.READ]))).toPromise()
    })
    return event
  }

  async update(userId: Event["userId"], eventId: Event["uuid"], data: Partial<Event>): Promise<Event> {
    const event = await this.findByIds(userId, eventId)
    return this.eventRepository.save(this.eventRepository.merge(event, data))
  }

  async delete(userId: Event["userId"], eventId: Event["uuid"]): Promise<string> {
    const event = await this.findByIds(userId, eventId)
    await this.eventRepository.deleteOne(event)
    return event.uuid
  }
}
