import { Injectable } from "@nestjs/common"

import { User } from "modules/user"

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

  async findByIds(userId: Service["userId"], uuid: Service["uuid"]): Promise<Service> {
    return this.serviceRepository.findOneOrFail({ uuid, userId })
  }

  async create(user: User, data: Partial<Service>): Promise<Service> {
    const service = this.serviceRepository.create({ userId: user.uuid, ...data })
    return this.serviceRepository.save(service)
  }

  async update(userId: Service["userId"], serviceId: Service["uuid"], data: Partial<Service>): Promise<Service> {
    const service = await this.findByIds(userId, serviceId)
    return this.serviceRepository.save(this.serviceRepository.merge(service, data))
  }

  async delete(userId: Service["userId"], serviceId: Service["uuid"]): Promise<string> {
    const service = await this.findByIds(userId, serviceId)
    await this.serviceRepository.deleteOne(service)
    return service.uuid
  }
}
