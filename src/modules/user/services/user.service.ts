import { Injectable } from "@nestjs/common"
import { merge } from "lodash/fp"

import { UserRepository } from "../repositories"
import { User, Profile } from "../entities"
import { plainToClass } from "class-transformer"
import { UserExposeGroup } from "@ciclismurban/models"

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: Partial<User>): Promise<User> {
    const entity = this.userRepository.create(data)
    return this.userRepository.save(entity)
  }

  async findOneById(uuid: string): Promise<User> {
    return this.userRepository.findOne({ uuid })
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({ email })
  }

  async updateProfile(user: User, profile: Partial<Profile>): Promise<User> {
    const merged = this.userRepository.merge(user, { profile: merge(user.profile, profile) })
    return this.userRepository.save(merged)
  }
}
