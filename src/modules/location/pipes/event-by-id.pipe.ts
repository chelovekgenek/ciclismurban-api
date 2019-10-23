import { PipeTransform, Injectable } from "@nestjs/common"
import { Event } from "../entities"
import { EventRepository } from "../repositories"

interface IReqParams {
  id: string
}

@Injectable()
export class EventByIdPipe implements PipeTransform<IReqParams, Promise<Event>> {
  constructor(protected readonly eventRepository: EventRepository) {}

  async transform({ id }: IReqParams) {
    return this.eventRepository.findOneOrFail({ uuid: id })
  }
}
