import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"

import { User } from "modules/user"

import { AuthService } from "../services"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
    })
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser({ email, password })
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
