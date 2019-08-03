import { JwtService } from "@nestjs/jwt"
import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common"
import { plainToClass } from "class-transformer"
import bcrypt from "bcrypt"

import { JwtPayload } from "../interfaces/jwt.interface"
import { AuthResponseDto } from "../dto"
import { User } from "../entities"
import { ExposeGroup } from "../models"
import { UserService } from "./user.service"

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async login(data: User): Promise<AuthResponseDto> {
    try {
      const user = await this.userService.findOneByEmail(data.email)
      const match = await bcrypt.compare(data.password, user.password)
      if (!match) {
        throw new Error()
      }

      return this.response(user)
    } catch (e) {
      throw new UnauthorizedException(e.message, e)
    }
  }

  async loginByToken(token: string): Promise<AuthResponseDto> {
    const payload = this.verifyToken(token)
    const user = await this.validatePayload(payload)
    return this.response(user)
  }

  async register(data: User): Promise<AuthResponseDto> {
    try {
      const user = await this.userService.create(data)
      return this.response(user)
    } catch (e) {
      throw new ConflictException(e.message, e)
    }
  }

  async response(user: User): Promise<AuthResponseDto> {
    return plainToClass(
      AuthResponseDto,
      {
        token: this.jwtService.sign({ uuid: user.uuid }),
        data: user,
      },
      { groups: [ExposeGroup.READ] },
    )
  }

  verifyToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify(token)
    } catch (e) {
      throw new UnauthorizedException(e.message, e)
    }
  }

  async validatePayload({ uuid }: JwtPayload): Promise<User> {
    const user = await this.userService.findOneById(uuid)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
