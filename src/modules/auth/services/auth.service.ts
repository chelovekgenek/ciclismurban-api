import { JwtService } from "@nestjs/jwt"
import { Injectable, ConflictException } from "@nestjs/common"
import { plainToClass } from "class-transformer"
import bcrypt from "bcrypt"

import { User, ExposeGroup, UserService } from "modules/user"

import { JwtPayload } from "../interfaces"
import { AuthResponseDto } from "../dto"

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async register(data: Partial<User>): Promise<AuthResponseDto> {
    try {
      const user = await this.userService.create(data)
      return this.pack(user)
    } catch (e) {
      throw new ConflictException()
    }
  }

  async pack(user: User): Promise<AuthResponseDto> {
    const payload: JwtPayload = { sub: user.uuid }
    return plainToClass(
      AuthResponseDto,
      {
        token: this.jwtService.sign(payload),
        data: user,
      },
      { groups: [ExposeGroup.READ] },
    )
  }

  async validateUser(data: Pick<User, "email" | "password">) {
    const user = await this.userService.findOneByEmail(data.email)
    let match = false
    if (user) {
      match = await bcrypt.compare(data.password, user.password)
    }
    if (match) {
      return user
    }
    return null
  }

  async validatePayload({ sub: uuid }: JwtPayload): Promise<User> {
    try {
      return this.userService.findOneById(uuid)
    } catch (e) {
      return null
    }
  }

  async validateOrCreateSocialUser(email: string): Promise<User> {
    let user: User
    try {
      user = await this.userService.findOneByEmail(email)
    } catch (e) {}
    if (!user) {
      user = await this.userService.create({ email })
    }
    return user
  }
}
