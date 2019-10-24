import { Injectable } from "@nestjs/common"

import { ServiceRepository } from "../repositories"
import { Service } from "../entities"

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async find(): Promise<Service[]> {
    return this.serviceRepository.find()
  }

  async findById(uuid: Service["uuid"]): Promise<Service> {
    return this.serviceRepository.findOneOrFail({ uuid })
  }

  async create(data: Partial<Service>): Promise<Service> {
    return this.serviceRepository.save(data)
  }

  async update(parking: Service, data: Partial<Service>): Promise<Service> {
    return this.serviceRepository.save(this.serviceRepository.merge(parking, data))
  }

  async delete(parking: Service): Promise<string> {
    await this.serviceRepository.deleteOne(parking)
    return parking.uuid
  }
}
