import { Injectable, OnModuleInit, Inject, Logger } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

import { EventRepository } from "../repositories"
import { Event } from "../entities"
import { EventTypes, MESSAGE_SERVICE } from "../interfaces"
import { classToPlain } from "class-transformer"
import { ExposeGroup } from "../models"
import { getResponseOptions as options } from "modules/commons"
import { LoggerService } from "modules/logger"

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
      this.client.emit(EventTypes.CREATED, classToPlain(event, options([ExposeGroup.READ]))).toPromise()
    })
    return event
  }

  async delete(event: Event): Promise<Event> {
    await this.eventRepository.deleteOne(event)
    return event
  }
}
