import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"

import { ExtractJwt, Strategy } from "passport-jwt"
import { AuthService } from "../services"
import { JwtPayload } from "../interfaces/jwt.interface"
import { JWT_OPTIONS } from "../constants"
import { AuthResponseDto } from "../dto"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_OPTIONS.secret,
    })
  }

  async validate(payload: JwtPayload): Promise<AuthResponseDto> {
    const user = await this.authService.validatePayload(payload)
    if (!user) {
      throw new UnauthorizedException()
    }
    return this.authService.pack(user)
  }
}
