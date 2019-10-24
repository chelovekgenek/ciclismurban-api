import { PipeTransform, Injectable } from "@nestjs/common"

import { Service } from "../entities"
import { ServiceRepository } from "../repositories"

interface IReqParams {
  id: string
}

@Injectable()
export class ServiceByIdPipe implements PipeTransform<IReqParams, Promise<Service>> {
  constructor(protected readonly serviceRepository: ServiceRepository) {}

  async transform({ id }: IReqParams) {
    return this.serviceRepository.findOneOrFail({ uuid: id })
  }
}
