import { Injectable } from "@nestjs/common"

import { UserRepository } from "./user.repository"
import { UserModel } from "./models"

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: UserModel): Promise<UserModel> {
    const entity = this.userRepository.create(data)
    return this.userRepository.save(entity)
  }

  async findAll(): Promise<UserModel[]> {
    return this.userRepository.find()
  }

  async findOneById(uuid: string): Promise<UserModel> {
    return this.userRepository.findOne({ uuid })
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    return this.userRepository.findOneOrFail({ email })
  }

  async updateById(uuid: string, data: Partial<UserModel>) {
    return this.userRepository.updateOne({ uuid }, { $set: { ...data } })
  }
}
