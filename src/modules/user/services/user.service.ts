import { Injectable } from "@nestjs/common"

import { UserRepository } from "../user.repository"
import { User } from "../entities"

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: User): Promise<User> {
    const entity = this.userRepository.create(data)
    return this.userRepository.save(entity)
  }

  async findOneById(uuid: string): Promise<User> {
    return this.userRepository.findOne({ uuid })
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({ email })
  }
}
