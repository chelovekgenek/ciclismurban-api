import { Injectable } from "@nestjs/common"

import { Shop } from "../entities"
import { ShopRepository } from "../repositories"

@Injectable()
export class ShopService {
  constructor(private readonly shopRepository: ShopRepository) {}

  async find(): Promise<Shop[]> {
    return this.shopRepository.find()
  }

  async findById(uuid: Shop["uuid"]): Promise<Shop> {
    return this.shopRepository.findOneOrFail({ uuid })
  }

  async create(data: Partial<Shop>): Promise<Shop> {
    return this.shopRepository.save(data)
  }

  async update(parking: Shop, data: Partial<Shop>): Promise<Shop> {
    return this.shopRepository.save(this.shopRepository.merge(parking, data))
  }

  async delete(parking: Shop): Promise<string> {
    await this.shopRepository.deleteOne(parking)
    return parking.uuid
  }
}
