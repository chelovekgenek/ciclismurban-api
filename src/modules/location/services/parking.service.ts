import { Injectable } from "@nestjs/common"

import { ParkingRepository } from "../repositories"
import { Parking } from "../entities"

@Injectable()
export class ParkingService {
  constructor(private readonly parkingRepository: ParkingRepository) {}

  async find(): Promise<Parking[]> {
    return this.parkingRepository.find()
  }

  async findById(uuid: Parking["uuid"]): Promise<Parking> {
    return this.parkingRepository.findOneOrFail({ uuid })
  }

  async create(data: Partial<Parking>): Promise<Parking> {
    return this.parkingRepository.save(data)
  }

  async update(parking: Parking, data: Partial<Parking>): Promise<Parking> {
    return this.parkingRepository.save(this.parkingRepository.merge(parking, data))
  }

  async delete(parking: Parking): Promise<string> {
    await this.parkingRepository.deleteOne(parking)
    return parking.uuid
  }
}
