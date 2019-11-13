import { Injectable, OnModuleInit, Inject } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { classToPlain } from "class-transformer"
import { LocationExposeGroup } from "@ciclismurban/models"

import { getResponseOptions as options } from "modules/commons"
import { LoggerService } from "modules/logger"

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

  async create(data: Partial<Event>): Promise<Event> {
    const event = await this.eventRepository.save(data)
    process.nextTick(() => {
      this.client.emit(EventTypes.CREATED, classToPlain(event, options([LocationExposeGroup.READ]))).toPromise()
    })
    return event
  }

  async update(event: Event, data: Partial<Event>): Promise<Event> {
    return this.eventRepository.save(this.eventRepository.merge(event, data))
  }

  async delete(event: Event): Promise<string> {
    await this.eventRepository.deleteOne(event)
    return event.uuid
  }
}
