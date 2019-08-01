import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"

import { Config } from "modules/commons"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AuthService } from "./services"
import { JwtPayload } from "./interfaces/jwt.interface"
import { User } from "./entities"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Config.get("JWT_SECRET"),
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.authService.validatePayload(payload)
  }
}
