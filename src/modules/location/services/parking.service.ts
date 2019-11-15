import { Injectable } from "@nestjs/common"

import { User } from "modules/user"

import { ParkingRepository } from "../repositories"
import { Parking } from "../entities"

@Injectable()
export class ParkingService {
  constructor(private readonly parkingRepository: ParkingRepository) {}

  async find(): Promise<Parking[]> {
    return this.parkingRepository.find()
  }

  async findByIds(userId: Parking["userId"], uuid: Parking["uuid"]): Promise<Parking> {
    return this.parkingRepository.findOneOrFail({ uuid, userId })
  }

  async create(user: User, data: Partial<Parking>): Promise<Parking> {
    const parking = this.parkingRepository.create({ userId: user.uuid, ...data })
    return this.parkingRepository.save(parking)
  }

  async update(userId: Parking["userId"], parkingId: Parking["uuid"], data: Partial<Parking>): Promise<Parking> {
    const parking = await this.findByIds(userId, parkingId)
    return this.parkingRepository.save(this.parkingRepository.merge(parking, data))
  }

  async delete(userId: Parking["userId"], parkingId: Parking["uuid"]): Promise<string> {
    const parking = await this.findByIds(userId, parkingId)
    await this.parkingRepository.deleteOne(parking)
    return parking.uuid
  }
}
