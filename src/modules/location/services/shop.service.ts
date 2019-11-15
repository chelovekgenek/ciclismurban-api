import { Injectable } from "@nestjs/common"

import { User } from "modules/user"

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

  async findByIds(userId: Shop["userId"], uuid: Shop["uuid"]): Promise<Shop> {
    return this.shopRepository.findOneOrFail({ uuid, userId })
  }

  async create(user: User, data: Partial<Shop>): Promise<Shop> {
    const shop = this.shopRepository.create({ userId: user.uuid, ...data })
    return this.shopRepository.save(shop)
  }

  async update(userId: Shop["userId"], shopId: Shop["uuid"], data: Partial<Shop>): Promise<Shop> {
    const shop = await this.findByIds(userId, shopId)
    return this.shopRepository.save(this.shopRepository.merge(shop, data))
  }

  async delete(userId: Shop["userId"], shopId: Shop["uuid"]): Promise<string> {
    const shop = await this.findByIds(userId, shopId)
    await this.shopRepository.deleteOne(shop)
    return shop.uuid
  }
}
